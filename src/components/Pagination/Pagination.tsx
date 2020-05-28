import React from 'react';
import { Link } from 'gatsby';
import './Pagination.scss';
import cn from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  url: string;
  firstPage?: string;
  pageIndexList: (number | '...')[];
}

const Pagination = ({ currentPage, totalPages, url, firstPage, pageIndexList }: Props) => {
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
        {pageIndexList.map((v) =>
          v !== '...' ? (
            <Link
              className={cn('Pagination__numbers', 'Pagination__numbers--link', {
                'Pagination__numbers--current': currentPage === v,
              })}
              key={`pagination-number-${v}`}
              to={`/${v !== 1 ? url : firstPage}/${v === 1 ? '' : v}`}
            >
              {v}
            </Link>
          ) : (
            <span
              className={'Pagination__numbers Pagination__numbers--disable'}
              key={`pagination-number-${v}`}
            >
              {v}
            </span>
          ),
        )}

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
