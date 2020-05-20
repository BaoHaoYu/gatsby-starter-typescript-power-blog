import { Data } from './index';
import $ from 'jquery';

// 获得文章标题导航数据
export default function tocData($h: JQuery) {
  const list: Data = [];
  let pH2NavIndex = 0;
  let pH3NavIndex = 0;
  let pH4NavIndex = 0;
  let pH5NavIndex = 0;
  let pH6NavIndex = 0;

  function h3List() {
    if (!list[pH2NavIndex - 1].children) {
      list[pH2NavIndex - 1].children = [];
    }
    return list[pH2NavIndex - 1].children || [];
  }
  function h4List() {
    const h4s = h3List();
    if (!h4s[pH3NavIndex - 1].children) {
      h4s[pH3NavIndex - 1].children = [];
    }
    return h4s[pH3NavIndex - 1].children || [];
  }
  function h5List() {
    const h5s = h4List();
    if (!h5s[pH4NavIndex - 1].children) {
      h5s[pH4NavIndex - 1].children = [];
    }
    return h5s[pH4NavIndex - 1].children || [];
  }
  function h6List() {
    const h6s = h5List();
    if (!h6s[pH5NavIndex - 1].children) {
      h6s[pH5NavIndex - 1].children = [];
    }
    return h6s[pH5NavIndex - 1].children || [];
  }
  $h.each((_index: number, el: HTMLElement) => {
    const id = $(el).attr('id') || '';
    const title = $(el).text() || '';
    if (el.tagName === 'H2') {
      pH2NavIndex++;
      pH3NavIndex = 0;
      pH4NavIndex = 0;
      pH5NavIndex = 0;
      pH6NavIndex = 0;
      list.push({ id, title, index: pH2NavIndex.toString() });
    } else if (el.tagName === 'H3') {
      pH3NavIndex++;
      pH4NavIndex = 0;
      pH5NavIndex = 0;
      pH6NavIndex = 0;
      const h3s = h3List();
      h3s.push({
        id,
        title,
        parent: [pH2NavIndex - 1],
        index: `${pH2NavIndex}.${pH3NavIndex}`,
      });
    } else if (el.tagName === 'H4') {
      pH4NavIndex++;
      pH5NavIndex = 0;
      pH6NavIndex = 0;
      const h4s = h4List();
      h4s.push({
        id,
        title,
        parent: [pH2NavIndex - 1, pH3NavIndex - 1],
        index: `${pH2NavIndex}.${pH3NavIndex}.${pH4NavIndex}`,
      });
    } else if (el.tagName === 'H5') {
      pH5NavIndex++;
      pH6NavIndex = 0;
      const h5s = h5List();
      h5s.push({
        id,
        title,
        parent: [pH2NavIndex - 1, pH3NavIndex - 1, pH4NavIndex - 1],
        index: `${pH2NavIndex}.${pH3NavIndex}.${pH4NavIndex}.${pH5NavIndex}`,
      });
    } else if (el.tagName === 'H6') {
      pH5NavIndex++;
      const h6s = h6List();
      h6s.push({
        id,
        title,
        parent: [pH2NavIndex - 1, pH3NavIndex - 1, pH4NavIndex - 1, pH5NavIndex - 1],
        index: `${pH2NavIndex}.${pH3NavIndex}.${pH4NavIndex}.${pH5NavIndex}.${pH6NavIndex}`,
      });
    }
  });

  return list;
}
