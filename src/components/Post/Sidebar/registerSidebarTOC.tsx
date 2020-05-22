import { Data } from './index';
import get from 'lodash/get';

interface IP {
  postHeadElement: HTMLElement[];

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

export function registerSideBarTOC(p: IP) {
  const { postHeadElement, activeIndex, data } = p;
  const single = toSingle(data);
  const viewState: {
    target: HTMLElement;
    isView: boolean;
  }[] = [];
  postHeadElement.map((el) => {
    viewState.push({
      target: el,
      isView: false,
    });
  });
  function findIndex(entries: IntersectionObserverEntry[], _postHeadEl: HTMLElement[]) {
    for (const entry of entries) {
      const index = _postHeadEl.indexOf(entry.target as HTMLElement);
      viewState[index].isView = entry.intersectionRatio === 1;
    }
    for (let i = 0; i < viewState.length; i++) {
      const viewStateElement = viewState[i];
      if (viewStateElement.isView) {
        const rect = viewStateElement.target.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 1) {
          return i;
        }
        if (i === 0) {
          return 0;
        } else {
          return i - 1;
        }
      }
    }
    return 0;
  }

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      const index = findIndex(entries, postHeadElement);
      activeIndex(single[index], findNodeParents(data, single[index]), single);
    },
    {
      threshold: 1,
    },
  );
  postHeadElement.forEach((item) => intersectionObserver.observe(item as HTMLElement));

  return intersectionObserver;
}
