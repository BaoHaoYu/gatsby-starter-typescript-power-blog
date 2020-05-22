import React, { useRef } from 'react';
import cn from 'classnames';
import './index.scss';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { registerSideBarTOC } from '~/components/Post/sidebar/registerSidebarTOC';
import $ from 'jquery';
import get from 'lodash/get';

const sideBarStore = observable({
  data: [] as Data,
  setActive(item: Data[0], active = true) {
    item.active = active;
    item.open = active;
  },
  initData(data: Data) {
    sideBarStore.data = data;
  },
  clean() {
    function _clean(_data: Data) {
      for (const item of _data) {
        sideBarStore.setActive(item, false);
        if (item.children) {
          _clean(item.children);
        }
      }
    }
    _clean(sideBarStore.data);
  },
});
export type Data = {
  // 文字
  title: string;
  // 对应post的head的id
  id: string;
  // 下标如 1.1，1.2，1.3
  index?: string;
  // 是否展开
  open?: boolean;
  // 是否激活
  active?: boolean;
  // 父节点路径，没有不过没有children
  parent?: number[];
  // 子节点
  children?: Data;
}[];

export interface ISideBarProps {
  data: Data;
  postHeadElement: HTMLElement[];
  onClickTitle?(e: React.MouseEvent, item: Data[0]): void;
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  const intersectionObserver = useRef<null | IntersectionObserver>();
  React.useEffect(() => {
    if (props.data.length > 0) {
      intersectionObserver.current = init(props);
    }
    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, [props.data]);

  function renderNode(data: ISideBarProps['data'] = []) {
    return data.map((item) => {
      return (
        <div
          className={cn('SideBarTOC__node', { 'SideBarTOC__node--active': item.active })}
          key={item.title}
        >
          <a
            onClick={(e) => {
              clickNav(e, item);
            }}
            href={'#' + item.id}
            className={'SideBarTOC__title'}
          >
            {item.title}
          </a>
          {item.children && item.open && renderNode(item.children)}
        </div>
      );
    });
  }
  return <div className={'SideBarTOC'}>{renderNode(sideBarStore.data)}</div>;
};

// 初始化
function init(props: ISideBarProps) {
  sideBarStore.initData(props.data);
  return registerSideBarTOC({
    data: sideBarStore.data,
    postHeadElement: props.postHeadElement,
    activeIndex(headElement) {
      sideBarStore.clean();
      const item = findItem(sideBarStore.data, headElement.id);
      if (item) {
        sideBarStore.setActive(item);
        findNodeParents(sideBarStore.data, item).map((pItem) => {
          sideBarStore.setActive(pItem);
        });
      }
      return;
    },
  });
}

// 点击导航
function clickNav(e: React.MouseEvent & React.BaseSyntheticEvent, item: Data[0]) {
  e.preventDefault();
  const $scroll = $(window);
  const target = document.getElementById(item.id) as HTMLElement;
  const offset = target.getBoundingClientRect().top + ($scroll.scrollTop() || 0);
  $scroll.scrollTop(offset);
}

// 解开嵌套
function findItem(data: Data, id: string) {
  function _findItem(_data: Data): Data[0] | null {
    for (const item of _data) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const hasFind = _findItem(item.children);
        if (hasFind) {
          return hasFind;
        }
      }
    }
    return null;
  }

  return _findItem(data);
}

// 所有的父节点
function findNodeParents(data: Data, item: Data[0]) {
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

export default observer(SideBar);
