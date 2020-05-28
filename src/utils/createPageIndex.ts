import defaults from 'lodash/defaults';
import paginate from 'jw-paginate';
import last from 'lodash/last';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
export interface PIndex {
  totalItemNumber: number;
  currentPage: number;
  itemPerPage: number;
  maxBeforePage?: number;
  maxCenterPage?: number;
  maxAfterPage?: number;
}

export default function createPageIndex(p: PIndex) {
  const newP: Required<PIndex> = defaults(p, {
    maxBeforePage: 1,
    maxCenterPage: 3,
    maxAfterPage: 1,
  });

  const {
    totalItemNumber,
    currentPage,
    itemPerPage,
    maxBeforePage,
    maxAfterPage,
    maxCenterPage,
  } = newP;
  const now = paginate(totalItemNumber, currentPage, itemPerPage, maxCenterPage);

  let beforePageIndex: any[] = [];
  let afterPageIndex: any[] = [];
  let before = false;
  let after = false;
  const totalPages = now.totalPages;

  for (let i1 = 0; i1 < maxBeforePage + 2; i1++) {
    beforePageIndex.push(i1 + 1);
  }
  for (let i2 = totalPages; i2 > totalPages - maxAfterPage - 2; i2--) {
    afterPageIndex.push(i2);
  }
  afterPageIndex.reverse();

  if (last(beforePageIndex) < now.pages[0]) {
    before = true;
  }
  if (afterPageIndex[0] > last(now.pages)!) {
    after = true;
  }
  beforePageIndex = take(beforePageIndex, maxBeforePage).filter((v) => v < now.pages[0]);
  afterPageIndex = takeRight(afterPageIndex, maxAfterPage).filter((v) => v > last(now.pages)!);
  if (before) {
    beforePageIndex.push('...');
  }
  if (after) {
    afterPageIndex.unshift('...');
  }

  return [...beforePageIndex, ...now.pages, ...afterPageIndex].filter((v) => v !== null);
}
console.log(createPageIndex({ totalItemNumber: 60, currentPage: 5, itemPerPage: 10 }));
