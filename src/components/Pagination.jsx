export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Referrals pagination">
      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      {totalPages > 1 && (
        <ul className="pagination__pages">
          {pages.map((p) => (
            <li key={p}>
              <button
                type="button"
                className={`pagination__page ${p === page ? 'pagination__page--active' : ''}`}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
