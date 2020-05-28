import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Article, Pagination } from '../components';
import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { animated, useSpring } from 'react-spring';
import { Layout as L1 } from '~/components/Layout/index';
import createPageIndex from '~/utils/createPageIndex';

export default (props: PageProps) => {
  const {
    posts,
    categoryName,
    cCategories,
    cTags,
    postsPerPage,
    togglePostsNumber,
    lastUpdatePosts,
    currentPage,
    totalPages,
  } = props.pathContext;

  const articleSpring = useSpring({
    tension: 300,
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });

  const pageIndexList = createPageIndex({
    toggleItemNumber: togglePostsNumber,
    itemPerPage: postsPerPage,
    currentPage,
  });

  return (
    <Layout>
      <Helmet title={`${categoryName} | ${config.siteTitle}`} />
      <L1
        activeCategory={categoryName}
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
          pageIndexList={pageIndexList}
          currentPage={currentPage}
          totalPages={totalPages}
          url={'categories/' + categoryName}
        />
      </L1>
    </Layout>
  );
};
