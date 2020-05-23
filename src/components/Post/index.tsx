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
import IPost from '~/models/Post';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { NavPreAndNext } from './NavPreAndNext/NavPreAndNext';
import { useSpring, animated } from 'react-spring';
import { imageGallery } from '~/utils/imageGallery';

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
function bindTabs(selector: string, activeClass: string) {
  const $item = $(selector);
  $item.on('click', function (e) {
    e.preventDefault();
    const paneActiveClass = 'tab-content__pane--active';
    const index = $item.index(this);
    $item.removeClass(activeClass).eq(index).addClass(activeClass);
    $(this)
      .parent()
      .next()
      .children()
      .removeClass(paneActiveClass)
      .eq(index)
      .addClass(paneActiveClass);
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

    bindTabs('.code-tabs .nav__item', 'nav__item--active');
    bindTabs('.codeTabs .codeTabs__link', 'codeTabs__link--active');
    $('.collapse__toggle').on('click', function (e) {
      e.preventDefault();
      $(this).parent().children('.collapse__content').toggleClass('collapse__content--active');
    });
    const $images = $('#postContent').find('img');

    imageGallery($images);
  }, []);

  const toggleStyle: React.CSSProperties =
    state.toggleToc && exceedMd
      ? { opacity: 1, transform: 'translateY(0)', display: 'block' }
      : { opacity: 0, transform: 'translateY(50px)', display: 'none' };

  const sideBarSpring = useSpring({
    delay: state.toggleToc ? 100 : 0,
    config: { tension: state.toggleToc ? 200 : 0 },
    from: { opacity: 0, transform: 'translateY(50px)' },
    ...toggleStyle,
  });

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
            <div style={{ marginBottom: `1.5rem` }}>
              <Meta
                tags={props.tags}
                categories={props.categories}
                date={props.date}
                timeToRead={props.timeToRead}
              />
            </div>
          </Col>

          {/*图片*/}
          {props.banner && (
            <div>
              <img className={'banner'} src={props.banner} alt={props.title} />
            </div>
          )}

          {/*内容*/}
          <Col style={{ margin: 'auto' }} lg={showToc ? 24 : 20}>
            <div
              className={cn('content', {
                'content--showToc': showToc,
              })}
            >
              <div id={'postContent'} ref={post} dangerouslySetInnerHTML={{ __html: html || '' }} />

              {exceedMd && <NavPreAndNext next={props.next} prev={props.prev} />}
            </div>
          </Col>
        </Col>

        {/*导航*/}
        <Col lg={6}>
          <Affix offsetTop={50}>
            {exceedMd && (
              <animated.div style={sideBarSpring}>
                <SideBar postHeadElement={state.postHeadElement} data={state.data} />
              </animated.div>
            )}
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
