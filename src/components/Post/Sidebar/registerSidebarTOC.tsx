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
  activeIndex(index: number): void;
}) {
  const { marginTop, postHeadEl, activeIndex } = p;
  const _marginTop = Math.floor(marginTop + 10000);
  const intersectionObserver = new IntersectionObserver(
    (entries, observe) => {
      const scrollHeight = document.documentElement.scrollHeight + 100;
      if (scrollHeight > _marginTop) {
        observe.disconnect();
        createIntersectionObserver(p);
        return;
      }
      activeIndex(findIndex(entries, postHeadEl));
    },
    {
      rootMargin: _marginTop + 'px 0px -100% 0px',
      threshold: 0,
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
    activeIndex(index: number) {
      activeIndex(single[index], findNodeParents(data, single[index]), single);
    },
    marginTop: document.documentElement.scrollHeight,
  });
}
