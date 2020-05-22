import * as React from 'react';
import SideBar, { Data } from '~/components/Post/Sidebar';
import { observer } from 'mobx-react';
import { Row, Col, Affix } from 'antd';
import tocData from '~/components/Post/Sidebar/tocData';
import $ from 'jquery';
import { useExceedMd } from '~/utils/media';
import { Meta, IMeta } from '~/components/Meta/Meta';
import { make } from './make';
import cn from 'classnames';
import './index.scss';
import { Link } from 'gatsby';
import IPost from '~/models/Post';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
interface IProps extends IMeta {
  title: string;
  slug: string;
  content: string;
  author?: string;
  authorUrl?: string;
  latestUpdateDate?: string;
  banner?: string;
  description?: string;
  prev?: IPost;
  next?: IPost;
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
  const exceedMd = useExceedMd();
  const [state, setState] = React.useState<{ data: Data; showToc: boolean }>({
    data: [],
    showToc: true,
  });
  const html = make(props.content);
  React.useEffect(() => {
    const head = $('.postContent').children('h2,h3,h4,h5,h6');
    bindTabs('.code-tabs .nav__item');
    state.data = tocData(head);
    setState({ ...state });
    $('.collapse__toggle').on('click', function (e) {
      e.preventDefault();
      $(this).parent().children('.collapse__content').toggleClass('collapse__content--active');
    });
  }, []);

  function toggleToc() {
    state.showToc = !state.showToc;
    setState({ ...state });
  }

  const showToc = exceedMd && state.showToc;
  return (
    <div>
      <Row gutter={showToc ? 50 : 0}>
        <Col lg={showToc ? 18 : 24} md={24}>
          {/*头部*/}
          <div>
            <h1 className={'h2'}>{props.title}</h1>
            <Meta
              tags={props.tags}
              categories={props.categories}
              date={props.date}
              timeToRead={props.timeToRead}
            />
          </div>

          {/*图片*/}
          <div>
            <img className={'banner'} src={props.banner} alt={props.title} />
          </div>

          {/*内容*/}
          <Col lg={showToc ? 24 : 20}>
            <div
              className={cn('content', {
                'content--showToc': showToc,
              })}
            >
              <div dangerouslySetInnerHTML={{ __html: html || '' }} />
              {exceedMd && (
                <div className={'navPost'}>
                  <Row>
                    {props.prev && (
                      <Col span={12}>
                        <div className={'navPost__item'}>
                          <span className={'navPost__label'}>prev blog : </span>
                          <Link className={'navPost__link'} to={'/blog/' + props.prev.fields.slug}>
                            {props.prev.frontmatter.title}
                          </Link>
                        </div>
                      </Col>
                    )}

                    {props.next && (
                      <Col span={12}>
                        <div className={'navPost__item navPost__item--next'}>
                          <span className={'navPost__label'}>prev blog : </span>
                          <Link className={'navPost__link'} to={'/blog/' + props.next.fields.slug}>
                            {props.next.frontmatter.title}
                          </Link>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Col>

        {/*导航*/}
        <Col hidden={!showToc} lg={6}>
          <Affix offsetTop={50}>
            <SideBar
              postHeadSelector={
                '.postContent > h2, .postContent > h3, .postContent > h4, .postContent > h5, .postContent > h6'
              }
              data={state.data}
            />
          </Affix>
        </Col>
      </Row>

      {exceedMd && (
        <div onClick={toggleToc} className={'bottom'}>
          {state.showToc ? (
            <AiOutlineMenuUnfold className={'s-icon'} />
          ) : (
            <AiOutlineMenuFold className={'s-icon'} />
          )}
        </div>
      )}
    </div>
  );
});
