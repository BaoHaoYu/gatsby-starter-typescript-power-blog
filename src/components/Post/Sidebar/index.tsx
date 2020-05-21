import * as React from 'react';
import cn from 'classnames';
import './index.scss';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { registerSideBarTOC } from '~/components/Post/sidebar/registerSidebarTOC';
import anime from 'animejs';
import $ from 'jquery';

const sideBarStore = observable({
  data: [] as Data,
  setActive(item: Data[0], active = true) {
    item.active = active;
    item.open = active;
  },
  initData(data: Data) {
    sideBarStore.data = data;
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
  postHead: string;
  onClickTitle?(e: React.MouseEvent, item: Data[0]): void;
}

// 初始化
function init(props: ISideBarProps) {
  const postHeadEl: HTMLElement[] = [];
  $(props.postHead).each((_index, item) => {
    postHeadEl.push(item);
  });
  sideBarStore.initData(props.data);
  registerSideBarTOC({
    data: sideBarStore.data,
    postHeadEl,
    activeIndex(item, parents, single) {
      single.map((node) => {
        sideBarStore.setActive(node, false);
      });

      parents.map((node) => {
        sideBarStore.setActive(node);
      });

      sideBarStore.setActive(item);
      return;
    },
  });
}
// 点击导航
function clickNav(e: React.MouseEvent & React.BaseSyntheticEvent, item: Data[0]) {
  e.preventDefault();
  sideBarStore.setActive(item);
  const $scroll = $(window);
  const target = document.getElementById(item.id) as HTMLElement;
  const offset = target.getBoundingClientRect().top + ($scroll.scrollTop() || 0);
  anime({
    targets: [document.documentElement],
    duration: 0,
    easing: 'linear',
    scrollTop: offset,
  });
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  React.useEffect(() => {
    init(props);
  }, [props.data]);

  function renderNode(data: ISideBarProps['data'] = []) {
    return data.map((item) => {
      return (
        <div
          className={cn('sideBarTOC__node', { 'sideBarTOC__node--active': item.active })}
          key={item.title}
        >
          <a
            onClick={(e) => {
              clickNav(e, item);
            }}
            href={'#' + item.id}
            className={'sideBarTOC__title'}
          >
            {item.title}
          </a>
          {item.children && item.open && renderNode(item.children)}
        </div>
      );
    });
  }
  return <div className={'sideBarTOC'}>{renderNode(sideBarStore.data)}</div>;
};

export default observer(SideBar);
