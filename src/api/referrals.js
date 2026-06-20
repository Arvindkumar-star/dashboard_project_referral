import { REFERRALS_URL } from './config';

function extractPayload(body) {
  if (body && typeof body === 'object') {
    if (body.data && typeof body.data === 'object') {
      return body.data;
    }
    return body;
  }
  return {};
}

async function getReferralsRaw(token, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const qs = query.toString();
  const url = qs ? `${REFERRALS_URL}?${qs}` : REFERRALS_URL;

  let response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error('Network error: unable to reach the server.');
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    
  }

  if (!response.ok) {
    const message = body?.message || 'Failed to load referrals';
    throw new Error(`${message} (status ${response.status})`);
  }

  return extractPayload(body);
}


export async function getReferrals(token, { search, sort } = {}) {
  const params = {};
  if (search) params.search = search;
  if (sort) params.sort = sort;
  const payload = await getReferralsRaw(token, params);
  return {
    metrics: Array.isArray(payload.metrics) ? payload.metrics : [],
    serviceSummary: payload.serviceSummary || null,
    referral: payload.referral || null,
    referrals: Array.isArray(payload.referrals) ? payload.referrals : [],
  };
}


export async function getReferralById(token, id) {
  const payload = await getReferralsRaw(token, { id });

  
  if (
    payload &&
    typeof payload === 'object' &&
    'id' in payload &&
    String(payload.id) === String(id) &&
    !Array.isArray(payload.referrals)
  ) {
    return payload;
  }

  if (Array.isArray(payload.referrals)) {
    const match = payload.referrals.find((row) => String(row.id) === String(id));
    if (match) return match;
  }


  if (payload && typeof payload === 'object' && 'id' in payload) {
    return payload;
  }

  return null;
}
