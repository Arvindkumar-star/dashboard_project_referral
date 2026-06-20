import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OverviewSection from '../components/OverviewSection';
import ServiceSummary from '../components/ServiceSummary';
import ShareReferral from '../components/ShareReferral';
import ReferralsTable from '../components/ReferralsTable';
import { getReferrals } from '../api/referrals';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [data, setData] = useState({
    metrics: [],
    serviceSummary: null,
    referral: null,
    referrals: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const token = Cookies.get('jwt_token');
        const result = await getReferrals(token, { search, sort });
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to load referrals');
      } finally {
        setLoading(false);
      }
    }, search ? 350 : 0);

    return () => clearTimeout(debounceRef.current);
  }, [search, sort]);

  return (
    <div className="page">
      <Navbar />

      <main className="dashboard">
        <div className="dashboard__header">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </div>

        {error && (
          <p className="alert alert--error" role="alert">
            {error}
          </p>
        )}

        {loading && !error && <p className="alert alert--loading">Loading dashboard…</p>}

        <OverviewSection metrics={data.metrics} />
        <ServiceSummary summary={data.serviceSummary} />
        <ShareReferral referral={data.referral} />
        <ReferralsTable
          referrals={data.referrals}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
      </main>

      <Footer />
    </div>
  );
}
