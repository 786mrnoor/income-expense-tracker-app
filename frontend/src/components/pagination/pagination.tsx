import { memo, useMemo } from "react";

type PaginationProps = {
  onPageChange: (page: number) => void;
  limit: number;
  total: number;
  activePage: number;
  className?: string;
}
export function Pagination({ onPageChange, limit, total, activePage, className }: PaginationProps) {

  const pageNumbers = useMemo(() => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(total / limit); i++) {
      paginationNumbers.push(i);
    }

    return paginationNumbers;
  }, [total, limit]);

  return (
    <ul className={`pagination justify-content-center flex-wrap ${className}`}>
      <li className={'page-item' + (activePage <= 1 ? ' disabled' : '')}>
        <button
          onClick={() => onPageChange(activePage - 1)}
          className="page-link"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      {pageNumbers.map((pageNumber) => (
        <li
          onClick={() => onPageChange(pageNumber)}
          className={'page-item' + (activePage === pageNumber ? ' active' : '')}
          key={pageNumber}
        >
          <button className="page-link">{pageNumber}</button>
        </li>
      ))}

      <li className={'page-item' + (activePage >= pageNumbers.length ? ' disabled' : '')}>
        <button className="page-link" onClick={() => onPageChange(activePage + 1)}>
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  );
}

export const MemoizedPagination = memo(Pagination);