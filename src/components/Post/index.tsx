import React, { useRef } from 'react';
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
  const [state, setState] = React.useState<{
    postHeadElement: HTMLElement[];
    data: Data;
    toggleToc: boolean;
  }>({
    data: [],
    toggleToc: true,
    postHeadElement: [],
  });
  const html = make(props.content);

  const post = useRef(null);
  React.useEffect(() => {
    const head = $(post.current!).children('h2,h3,h4,h5,h6');
    const postHeadElement: HTMLElement[] = [];
    head.each((_index, element) => {
      postHeadElement.push(element);
    });
    state.data = tocData(head);
    state.postHeadElement = postHeadElement;
    setState({ ...state });

    bindTabs('.code-tabs .nav__item');
    $('.collapse__toggle').on('click', function (e) {
      e.preventDefault();
      $(this).parent().children('.collapse__content').toggleClass('collapse__content--active');
    });
  }, []);

  function toggleToc() {
    state.toggleToc = !state.toggleToc;
    setState({ ...state });
  }

  const showToc = exceedMd && state.toggleToc && state.data.length > 0;
  return (
    <div>
      <Row gutter={showToc ? 50 : 0}>
        <Col lg={showToc ? 18 : 24} md={24}>
          {/*头部*/}
          <Col style={{ margin: 'auto' }} lg={showToc ? 24 : 20}>
            <h1 className={'h2'}>{props.title}</h1>
            <Meta
              tags={props.tags}
              categories={props.categories}
              date={props.date}
              timeToRead={props.timeToRead}
            />
          </Col>

          {/*图片*/}
          <div>
            <img className={'banner'} src={props.banner} alt={props.title} />
          </div>

          {/*内容*/}
          <Col style={{ margin: 'auto' }} lg={showToc ? 24 : 20}>
            <div
              className={cn('content', {
                'content--showToc': showToc,
              })}
            >
              <div
                className={'postContent'}
                ref={post}
                dangerouslySetInnerHTML={{ __html: html || '' }}
              />

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
            <SideBar postHeadElement={state.postHeadElement} data={state.data} />
          </Affix>
        </Col>
      </Row>

      {exceedMd && state.data.length > 0 && (
        <div onClick={toggleToc} className={'bottom'}>
          {state.toggleToc ? (
            <AiOutlineMenuUnfold className={'s-icon'} />
          ) : (
            <AiOutlineMenuFold className={'s-icon'} />
          )}
        </div>
      )}
    </div>
  );
});
