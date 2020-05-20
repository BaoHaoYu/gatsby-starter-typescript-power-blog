import * as React from 'react';
import Info from '~/components/Post/Info';
import SideBar, { Data } from '~/components/Post/Sidebar';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import tocData from '~/components/Post/Sidebar/tocData';
import $ from 'jquery';
import { useExceedMd } from '~/utils/media';

interface IProps {
  title: string;
  date: string;
  slug: string;
  timeToRead: number;
  categories: string[];
  tags: string[];
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
  $item.on('click', function () {
    const index = $item.index(this);
    $item.removeClass('active').eq(index).addClass('active');
    $(this).parent().next().children().removeClass('active').eq(index).addClass('active');
  });
}

export const Post: React.FunctionComponent<IProps> = observer((props: IProps) => {
  const [data, setData] = React.useState<Data>([]);
  const [mountPost, setMountPost] = React.useState<boolean>(false);

  const exceedMd = useExceedMd();

  React.useEffect(() => {
    const head = $('.postContent > h2, .postContent > h3, .postContent > h4, .postContent > h5');
    bindTabs('.code-tabs .nav-item');
    bindTabs('.code-tabs .codetab__link');
    setData(tocData(head));
    setMountPost(true);
    $('.collapse-head').on('click', function () {
      $(this).parent().children('.collapse').toggleClass('show');
    });
  }, []);
  return (
    <Row>
      <Col lg={18} md={24}>
        <Row>
          {/*头部*/}
          <Col lg={20}>
            <h1 className={'h2'}>{props.title}</h1>
            <Info
              tags={props.tags}
              categories={props.categories}
              date={props.date}
              author={props.author}
              authorUrl={props.authorUrl}
            />
          </Col>

          {/*图片*/}
          <Col span={24}>
            <img src={props.banner} alt={props.title} />
          </Col>

          {/*内容*/}
          <Col lg={20}>
            <div
              className={'content postContent'}
              dangerouslySetInnerHTML={{ __html: props?.content || '' }}
            />
          </Col>
        </Row>
      </Col>

      {/*导航*/}
      {mountPost && (
        <Col hidden={!exceedMd} lg={6}>
          <SideBar
            postHead={'.postContent > h2, .postContent > h3, .postContent > h4, .postContent > h5'}
            data={data}
          />
        </Col>
      )}
    </Row>
  );
});
