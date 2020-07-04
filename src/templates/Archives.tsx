import React from 'react';
import { Helmet } from 'react-helmet';
import { Pagination } from '~/components';
import config from '../../config/SiteConfig';
import { animated, useSpring } from 'react-spring';
import { Layout as L1 } from '~/components/Layout/index';
import Data from '~/models/Data';
import { ArchivesContext } from '~/models/PageContext';
import { PageProps } from 'gatsby';
import './Archives.scss';
import { Link } from 'gatsby';

type CategoryPageProps = PageProps<Data, ArchivesContext>;

// 分类展示文章列表
export default (props: CategoryPageProps) => {
  const { posts, postsPerPage, totalPostsNumber, currentPage } = props.pageContext;

  const articleSpring = useSpring({
    tension: 300,
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });
  return (
    <>
      <Helmet title={`${config.siteTitle}`} />
      <L1 showSideBar={false}>
        <animated.div style={articleSpring}>
          {posts?.map((post) => (
            <div className={'Archives__item'} key={post.node.frontmatter.title}>
              <Link to={'/blog/' + post.node.fields.slug}>
                <h5 className={'Archives__title'}>{post.node.frontmatter.title}</h5>
              </Link>
              <div className={'Archives__desc'}>{post.node.frontmatter.description}</div>
            </div>
          ))}
        </animated.div>

        <Pagination
          itemPerPage={postsPerPage}
          currentPage={currentPage}
          totalItemNumber={totalPostsNumber}
          url={'archives'}
        />
      </L1>
    </>
  );
};
