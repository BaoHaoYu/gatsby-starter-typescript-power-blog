import React from 'react';
import PageProps from '../models/PageProps';
import { Article, Layout, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import { Layout as L1 } from '~/components/Layout/index';
import { animated, useSpring } from 'react-spring';

export default (props: PageProps) => {
  const {
    posts,
    tagName,
    cCategories,
    cTags,
    lastUpdatePosts,
    currentPage,
    postsPerPage,
    totalPostsNumber,
  } = props.pathContext;

  const articleSpring = useSpring({
    tension: 300,
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });
  return (
    <Layout>
      <Helmet title={`${'Tags'} | ${config.siteTitle}`} />
      <L1
        activeTag={tagName}
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
          url={'tags/' + tagName}
        />
      </L1>
    </Layout>
  );
};
