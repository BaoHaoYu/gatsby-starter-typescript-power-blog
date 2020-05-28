import paginate from 'jw-paginate';
import last from 'lodash/last';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';
export interface PIndex {
  totalItemNumber: number;
  currentPage: number;
  itemPerPage: number;
  maxBeforePage?: number;
  maxCenterPage?: number;
  maxAfterPage?: number;
}

export default function createPageIndex(p: PIndex) {
  const newP: Required<PIndex> = {
    maxBeforePage: 1,
    maxCenterPage: 3,
    maxAfterPage: 1,
    ...p,
  };

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
  const totalPages = now.totalPages;

  for (let i1 = 0; i1 < maxBeforePage + 2 && i1 < now.pages[0]; i1++) {
    beforePageIndex.push(i1 + 1);
  }
  for (let i2 = totalPages; i2 > totalPages - maxAfterPage - 2 && i2 > 0; i2--) {
    afterPageIndex.push(i2);
  }
  afterPageIndex.reverse();

  if (last(beforePageIndex) < now.pages[0]) {
    beforePageIndex = [...take(beforePageIndex, maxBeforePage), 'before'];
  }
  if (afterPageIndex[0] > last(now.pages)!) {
    afterPageIndex = ['after', ...takeRight(afterPageIndex, maxAfterPage)];
  }

  return uniq(compact([...beforePageIndex, ...now.pages, ...afterPageIndex])).map((v) =>
    v === 'before' || v === 'after' ? '...' : v,
  );
}
