export default function OverviewSection({ metrics }) {
  return (
    <section className="panel" role="region" aria-label="Overview metrics">
      <h2 className="panel__title">Overview</h2>
      {metrics.length === 0 ? (
        <p className="panel__empty">No metrics available</p>
      ) : (
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div className="metric-card" key={metric.id ?? metric.label}>
              <span className="metric-card__label">{metric.label}</span>
              <span className="metric-card__value">{metric.value}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
