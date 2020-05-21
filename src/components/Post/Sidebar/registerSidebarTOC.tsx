import { Data } from './index';
import get from 'lodash/get';

interface IP {
  postHeadEl: HTMLElement[];

  activeIndex(item: Data[0], parents: Data, single: Data): void;

  data: Data;
}

// 解开嵌套
function toSingle(data: Data): Data {
  const newData: Data = [];

  function _toSingle(_data: Data) {
    _data.map((item) => {
      newData.push(item);

      if (item.children) {
        _toSingle(item.children);
      }
    });
  }

  _toSingle(data);

  return newData;
}

// 激活标题的序号
function findIndex(entries: IntersectionObserverEntry[], postHeadEl: HTMLElement[]): number {
  let index = 0;
  let entry = entries[index];
  if (entry.boundingClientRect.top > 0) {
    index = postHeadEl.indexOf(entry.target as HTMLElement);
    return index === 0 ? 0 : index - 1;
  }
  for (; index < entries.length; index++) {
    if (entries[index].boundingClientRect.top <= 0) {
      entry = entries[index];
    } else {
      return postHeadEl.indexOf(entry.target as HTMLElement);
    }
  }
  return postHeadEl.indexOf(entry.target as HTMLElement);
}

// 监视post头部滚动位置
function createIntersectionObserver(p: {
  marginTop: number;
  postHeadEl: HTMLElement[];
  active(index: number): void;
}) {
  const { postHeadEl, active } = p;
  const intersectionObserver = new IntersectionObserver(
    (entries, _observe) => {
      active(findIndex(entries, postHeadEl));
    },
    {
      rootMargin: document.documentElement.scrollHeight + '10000px 0px -100% 0px',
      threshold: 1,
    },
  );
  postHeadEl.forEach((item) => intersectionObserver.observe(item as HTMLElement));
}

// 所有的父节点
export function findNodeParents(data: Data, item: Data[0]) {
  const list: Data = [];

  function _find(_item: Data[0]) {
    if (_item.parent) {
      const parentNode = get(data, _item.parent.join('@@children@@').split('@@'));
      list.push(parentNode);

      if (parentNode.parent) {
        _find(parentNode);
      }
    }
  }

  _find(item);

  return list;
}

export default function registerSideBarTOCTOC(p: IP) {
  const { postHeadEl, data, activeIndex } = p;
  const single = toSingle(data);

  // 监视post头部滚动位置
  createIntersectionObserver({
    postHeadEl,
    active(index: number) {
      activeIndex(single[index], findNodeParents(data, single[index]), single);
    },
    marginTop: document.documentElement.scrollHeight,
  });
}

export function registerSideBarTOC(p: IP) {
  const { postHeadEl, activeIndex, data } = p;
  const single = toSingle(data);
  let stop = window.scrollY;
  let dir = '';
  window.addEventListener('scroll', () => {
    if (stop - window.scrollY > 0) {
      if (dir !== 'top') {
        dir = 'top';
      }
    } else {
      if (dir !== 'bottom') {
        dir = 'bottom';
      }
    }

    stop = window.scrollY;
  });
  let hasFindIndex = -1;

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio === 1) {
          if (dir === '') {
            hasFindIndex = postHeadEl.indexOf(entry.target as HTMLElement);
            activeIndex(single[hasFindIndex], findNodeParents(data, single[hasFindIndex]), single);
            return;
          }
          // 从上边进入
          if (dir === 'top') {
            hasFindIndex = postHeadEl.indexOf(entry.target as HTMLElement);
            activeIndex(
              single[hasFindIndex - 1 < 0 ? 0 : hasFindIndex - 1],
              findNodeParents(data, single[hasFindIndex]),
              single,
            );
          }
        } else {
          // 从下边离开
          if (dir === 'bottom') {
            hasFindIndex = postHeadEl.indexOf(entry.target as HTMLElement);
            activeIndex(single[hasFindIndex], findNodeParents(data, single[hasFindIndex]), single);
          }
        }
      }

      if (hasFindIndex === -1) {
        activeIndex(single[0], findNodeParents(data, single[0]), single);
      }
    },
    {
      threshold: 1,
    },
  );
  postHeadEl.forEach((item) => intersectionObserver.observe(item as HTMLElement));
}
