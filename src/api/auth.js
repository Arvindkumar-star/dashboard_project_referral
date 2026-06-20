import { AUTH_URL } from './config';

export async function signIn(email, password) {
  let response;
  try {
    response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error('Unable to reach the server. Please try again.');
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    
  }

  if (!response.ok) {
    const message = body?.message || 'Invalid email or password';
    throw new Error(message);
  }

  const token = body?.data?.token;
  if (!token) {
    throw new Error('Invalid email or password');
  }
  return token;
}
