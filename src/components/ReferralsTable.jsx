import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { formatDate, formatProfit } from '../utils/format';

const PAGE_SIZE = 10;

export default function ReferralsTable({ referrals, search, onSearchChange, sort, onSortChange }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [prevQuery, setPrevQuery] = useState({ search, sort });
  if (prevQuery.search !== search || prevQuery.sort !== sort) {
    setPrevQuery({ search, sort });
    if (page !== 1) setPage(1);
  }

  const total = referrals.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageRows = referrals.slice(startIndex, startIndex + PAGE_SIZE);
  const from = total === 0 ? 0 : startIndex + 1;
  const to = Math.min(startIndex + PAGE_SIZE, total);

  function goToReferral(id) {
    navigate(`/referral/${id}`);
  }

  return (
    <section className="panel">
      <div className="table-header">
        <h2 className="panel__title">All referrals</h2>
        <div className="table-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Name or service…"
            aria-label="Search referrals"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <label className="sort-control">
            Sort by date
            <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      <div className="table-scroll">
        <table className="referrals-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Service</th>
              <th scope="col">Date</th>
              <th scope="col">Profit</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="referrals-table__empty">
                  No matching entries
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  tabIndex={0}
                  className="referrals-table__row"
                  onClick={() => goToReferral(row.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goToReferral(row.id);
                    }
                  }}
                >
                  <td>{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{formatDate(row.date)}</td>
                  <td>{formatProfit(row.profit)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p className="table-footer__summary">
          Showing {from}–{to} of {total} entries
        </p>
        <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  );
}
