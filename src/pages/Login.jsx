import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signIn } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const token = await signIn(email, password);
      Cookies.set('jwt_token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="navbar__mark" aria-hidden="true">GB</span>
          <span>Go Business</span>
        </div>
        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__tagline">Sign in to open your referral dashboard.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="auth-card__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--block">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
