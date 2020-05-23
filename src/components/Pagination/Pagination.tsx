import React from 'react';
import { Link } from 'gatsby';
import './Pagination.scss';
import cn from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  url: string;
  firstPage?: string;
}

const Pagination = ({ currentPage, totalPages, url, firstPage }: Props) => {
  if (firstPage === undefined) {
    firstPage = `/${url}/`;
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? firstPage : `/${url}/${(currentPage - 1).toString()}`;
  const nextPage = `/${url}/${(currentPage + 1).toString()}`;

  return totalPages > 1 ? (
    <div style={{ textAlign: 'center' }}>
      <div className={'Pagination'}>
        {!isFirst && (
          <Link
            className={'Pagination__numbers--prev Pagination__numbers'}
            to={prevPage}
            rel="prev"
          >
            ← Prev
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            className={cn('Pagination__numbers', {
              'Pagination__numbers--current': currentPage === i + 1,
            })}
            key={`pagination-number${i + 1}`}
            to={`/${i !== 0 ? url : firstPage}/${i === 0 ? '' : i + 1}`}
          >
            {i + 1}
          </Link>
        ))}
        {!isLast && (
          <Link
            className={'Pagination__numbers--next Pagination__numbers'}
            to={nextPage}
            rel="next"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  ) : (
    <span />
  );
};

export { Pagination };
