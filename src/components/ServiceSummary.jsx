export default function ServiceSummary({ summary }) {
  const rows = [
    { label: 'Service', value: summary?.service },
    { label: 'Your Referrals', value: summary?.yourReferrals },
    { label: 'Active Referrals', value: summary?.activeReferrals },
    { label: 'Total Ref. Earnings', value: summary?.totalRefEarnings },
  ];

  return (
    <section className="panel" aria-label="Service summary">
      <h2 className="panel__title">Service summary</h2>
      {!summary ? (
        <p className="panel__empty">No service summary available</p>
      ) : (
        <dl className="summary-list">
          {rows.map((row) => (
            <div className="summary-list__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
