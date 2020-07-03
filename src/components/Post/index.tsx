import React, { useMemo, useRef, useEffect } from 'react';
import { Data, PostSidebar } from '~/components/Post/PostSidebar/PostSidebar';
import { observer } from 'mobx-react';
import { Row, Col, Affix } from 'antd';
import tocData from '~/components/Post/PostSidebar/tocData';
import $ from 'jquery';
import { useExceedMd } from '~/utils/media';
import { IMeta } from '~/components/Meta/Meta';
import { makeHtml } from './makeHtml';
import './index.scss';
import IPost from '~/models/Post';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';
import { imageGallery } from '~/utils/imageGallery';
import { PostContent } from './PostContent/PostContent';
import { PostHead } from './PostHead/PostHead';

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
    const $parent = $(this).parent();
    const paneActiveClass = 'tab-content__pane--active';
    const index = $parent.children().index(this);
    $parent.children().removeClass(activeClass).eq(index).addClass(activeClass);
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
  const html = useMemo(() => makeHtml(props.content), []);
  const post = useRef(null);

  useEffect(() => {
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
  const postHeadSpring = useSpring({
    delay: 100,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
  });
  const postContentSpring = useSpring({
    delay: 400,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
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
          <animated.div style={postHeadSpring}>
            {/*头部*/}
            <PostHead
              showToc={showToc}
              title={props.title}
              date={props.date}
              tags={props.tags}
              categories={props.categories}
              banner={props.banner}
              timeToRead={props.timeToRead}
            />
          </animated.div>

          {/*内容*/}
          <Col style={{ margin: 'auto' }} lg={showToc ? 24 : 20}>
            <animated.div style={postContentSpring}>
              <PostContent
                post={post}
                showToc={showToc}
                next={props.next}
                prev={props.prev}
                exceedMd={exceedMd}
                html={html}
              />
            </animated.div>
          </Col>
        </Col>

        {/*导航*/}
        <Col lg={6}>
          <Affix offsetTop={50}>
            {showToc && (
              <animated.div style={sideBarSpring}>
                <PostSidebar postHeadElement={state.postHeadElement} data={state.data} />
              </animated.div>
            )}
          </Affix>
        </Col>
      </Row>

      {/*显示隐藏导航栏*/}
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
