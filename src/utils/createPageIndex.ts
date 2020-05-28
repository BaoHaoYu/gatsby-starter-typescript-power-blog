import defaults from 'lodash/defaults';
import paginate from 'jw-paginate';

interface PIndex {
  toggleItemNumber: number;
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
    toggleItemNumber,
    currentPage,
    itemPerPage,
    maxBeforePage,
    maxAfterPage,
    maxCenterPage,
  } = newP;

  let beforePageIndex: any[] = [];
  let afterPageIndex: any[] = [];

  const now = paginate(toggleItemNumber, currentPage, itemPerPage, maxCenterPage);
  const totalPages = now.totalPages;

  for (let i1 = 0; i1 < maxBeforePage + 2; i1++) {
    beforePageIndex.push(i1 + 1);
  }
  for (let i2 = totalPages; i2 > totalPages - maxAfterPage - 2; i2--) {
    afterPageIndex.push(i2);
  }
  afterPageIndex.reverse();
  beforePageIndex = beforePageIndex.map((pageIndex) => {
    if (pageIndex < now.pages[0] && pageIndex < maxBeforePage + 2) {
      return pageIndex;
    }
    if (pageIndex < now.pages[0] && maxBeforePage + 2 < now.pages[0]) {
      return '...';
    }
    return null;
  });

  afterPageIndex = afterPageIndex.map((pageIndex) => {
    if (pageIndex > now.pages[now.pages.length - 1] && pageIndex > now.totalPages - maxAfterPage) {
      return pageIndex;
    }
    if (
      pageIndex > now.pages[now.pages.length - 1] &&
      pageIndex === now.totalPages - maxAfterPage
    ) {
      return '...';
    }
    return null;
  });

  return [...beforePageIndex, ...now.pages, ...afterPageIndex].filter((v) => v !== null);
}
