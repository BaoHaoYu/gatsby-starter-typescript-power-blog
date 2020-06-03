import { Data } from './PostSidebar';

interface IP {
  postHeadElement: HTMLElement[];
  activeIndex(headElement: HTMLElement, index: number): void;
  data: Data;
}

// 元素距离顶部的距离
function getTop(element: HTMLElement) {
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  return Math.trunc(elemRect.top - bodyRect.top);
}

export function registerSideBarTOC(p: IP) {
  const { postHeadElement, activeIndex } = p;
  function findIndex(_postHeadEl: HTMLElement[]) {
    const scrollY = window.scrollY;
    for (let index = 0; index < _postHeadEl.length; index++) {
      const htmlElement = _postHeadEl[index];
      const top = getTop(htmlElement);
      if (index + 1 < _postHeadEl.length) {
        if (scrollY >= top && scrollY < getTop(_postHeadEl[index + 1])) {
          return index;
        }
      } else if (scrollY >= top) {
        return index;
      }
    }
    return 0;
  }

  const intersectionObserver = new IntersectionObserver(
    (_entries) => {
      const index = findIndex(postHeadElement);
      activeIndex(postHeadElement[index], index);
    },
    {
      threshold: 1,
    },
  );
  postHeadElement.forEach((item) => intersectionObserver.observe(item as HTMLElement));

  return intersectionObserver;
}
