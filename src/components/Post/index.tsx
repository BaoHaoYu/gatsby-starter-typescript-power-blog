import * as React from 'react';
import SideBar, { Data } from '~/components/Post/Sidebar';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import tocData from '~/components/Post/Sidebar/tocData';
import $ from 'jquery';
import { useExceedMd } from '~/utils/media';
import { Meta, IMeta } from '~/components/Meta/Meta';
import { make } from './make';
import './index.scss';

interface IProps extends IMeta {
  title: string;
  slug: string;
  content: string;
  author?: string;
  authorUrl?: string;
  latestUpdateDate?: string;
  banner?: string;
  description?: string;
}

// 文章内tab切换
function bindTabs(selector: string) {
  const $item = $(selector);
  $item.on('click', function (e) {
    e.preventDefault();
    const activeClass = 'tab-content__pane--active';
    const index = $item.index(this);
    $item.removeClass('nav__item--active').eq(index).addClass('nav__item--active');
    $(this).parent().next().children().removeClass(activeClass).eq(index).addClass(activeClass);
  });
}

export const Post: React.FunctionComponent<IProps> = observer((props: IProps) => {
  const [data, setData] = React.useState<Data>([]);
  const [mountPost, setMountPost] = React.useState<boolean>(false);

  const exceedMd = useExceedMd();
  const html = make(props.content);
  React.useEffect(() => {
    const head = $('.postContent').children('h2,h3,h4,h5,h6');
    bindTabs('.code-tabs .nav__item');
    bindTabs('.code-tabs .codetab__link');
    setData(tocData(head));
    setMountPost(true);
    $('.collapse__toggle').on('click', function (e) {
      e.preventDefault();
      $(this).parent().children('.collapse__content').toggleClass('collapse__content--active');
    });
  }, []);
  return (
    <Row gutter={80}>
      <Col lg={18} md={24}>
        <Row>
          {/*头部*/}
          <Col lg={20}>
            <h1 className={'h2'}>{props.title}</h1>
            <Meta
              tags={props.tags}
              categories={props.categories}
              date={props.date}
              timeToRead={props.timeToRead}
            />
          </Col>

          {/*图片*/}
          <Col span={24}>
            <img src={props.banner} alt={props.title} />
          </Col>

          {/*内容*/}
          <Col lg={20}>
            <div className={'content'} dangerouslySetInnerHTML={{ __html: html || '' }} />
          </Col>
        </Row>
      </Col>

      {/*导航*/}
      {mountPost && (
        <Col hidden={!exceedMd} lg={6}>
          <SideBar
            postHead={
              '.postContent > h2, .postContent > h3, .postContent > h4, .postContent > h5, .postContent > h6'
            }
            data={data}
          />
        </Col>
      )}
    </Row>
  );
});
