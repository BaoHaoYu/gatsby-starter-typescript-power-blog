import React from 'react';
import { Helmet } from 'react-helmet';
import { Article, Pagination } from '../components';
import config from '../../config/SiteConfig';
import { animated, useSpring } from 'react-spring';
import { Layout as L1 } from '~/components/Layout/index';
import Data from '~/models/Data';
import { CategoryContext } from '~/models/PageContext';
import { PageProps } from 'gatsby';

type CategoryPageProps = PageProps<Data, CategoryContext>;

// 分类展示文章列表
export default (props: CategoryPageProps) => {
  const {
    posts,
    classification,
    cCategories,
    cTags,
    postsPerPage,
    totalPostsNumber,
    lastUpdatePosts,
    currentPage,
  } = props.pageContext;

  const articleSpring = useSpring({
    tension: 300,
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });
  const { allCategories } = props.pageContext;
  return (
    <>
      <Helmet title={`${classification} | ${config.siteTitle}`} />
      <L1
        allCategories={allCategories}
        activeCategory={classification}
        showSideBar={true}
        cTags={cTags}
        cCategories={cCategories}
        lastUpdatePosts={lastUpdatePosts}
      >
        <animated.div style={articleSpring}>
          {posts?.map((post) => (
            <Article
              key={post.fields.slug}
              description={post.frontmatter.description}
              banner={post.frontmatter.banner}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              tags={post.frontmatter.tags}
              categories={post.frontmatter.categories}
              excerpt={post.excerpt}
              timeToRead={post.timeToRead}
              slug={post.fields.slug}
            />
          ))}
        </animated.div>

        <Pagination
          itemPerPage={postsPerPage}
          currentPage={currentPage}
          totalItemNumber={totalPostsNumber}
          url={'categories/' + classification}
        />
      </L1>
    </>
  );
};
