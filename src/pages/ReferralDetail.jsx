import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import { getReferralById } from '../api/referrals';
import { formatDate, formatProfit } from '../utils/format';

export default function ReferralDetail() {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setNotFound(false);
      try {
        const token = Cookies.get('jwt_token');
        const row = await getReferralById(token, id);
        if (cancelled) return;
        if (row) {
          setReferral(row);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load referral');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="page">
      <Navbar />
      <main className="detail">
        <h1>Referral Details</h1>

        {loading && <p className="alert alert--loading">Loading referral…</p>}

        {!loading && error && (
          <p className="alert alert--error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && notFound && (
          <div className="panel detail__not-found">
            <h2>Referral not found</h2>
            <Link to="/" className="btn btn--primary">← Back to dashboard</Link>
          </div>
        )}

        {!loading && !error && !notFound && referral && (
          <div className="panel detail__card">
            <h2 className="detail__name">{referral.name}</h2>
            <dl className="detail__list">
              <div className="detail__row">
                <dt>Referral ID</dt>
                <dd>{referral.id}</dd>
              </div>
              <div className="detail__row">
                <dt>Service Name</dt>
                <dd>{referral.serviceName}</dd>
              </div>
              <div className="detail__row">
                <dt>Date</dt>
                <dd>{formatDate(referral.date)}</dd>
              </div>
              <div className="detail__row">
                <dt>Profit</dt>
                <dd>{formatProfit(referral.profit)}</dd>
              </div>
            </dl>
            <Link to="/" className="back-link">← Back to dashboard</Link>
          </div>
        )}
      </main>
    </div>
  );
}
