import React from 'react';
import { Link } from 'gatsby';
import './Pagination.scss';
import cn from 'classnames';
import createPageIndex, { PIndex } from './createPageIndex';

interface Props extends PIndex {
  url: string;
  firstPage?: string;
}

const Pagination = ({ currentPage, totalItemNumber, itemPerPage, url, firstPage }: Props) => {
  const pageIndexList = createPageIndex({
    totalItemNumber,
    itemPerPage,
    currentPage,
  });

  if (firstPage === undefined) {
    firstPage = `/${url}/`;
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === pageIndexList[pageIndexList.length - 1];
  const prevPage = currentPage - 1 === 1 ? firstPage : `/${url}/${(currentPage - 1).toString()}`;
  const nextPage = `/${url}/${(currentPage + 1).toString()}`;

  return (
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
        {pageIndexList.map((pageIndex) =>
          pageIndex !== '...' ? (
            <Link
              className={cn('Pagination__numbers', 'Pagination__numbers--link', {
                'Pagination__numbers--current': currentPage === pageIndex,
              })}
              key={`pagination-number-${pageIndex}`}
              to={`/${pageIndex !== 1 ? url : firstPage}/${pageIndex === 1 ? '' : pageIndex}`}
            >
              {pageIndex}
            </Link>
          ) : (
            <span
              className={'Pagination__numbers Pagination__numbers--disable'}
              key={`pagination-number-${pageIndex}`}
            >
              {pageIndex}
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
  );
};

export { Pagination };
