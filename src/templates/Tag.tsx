import React from 'react';
import { Article, Layout, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import { Layout as L1 } from '~/components/Layout/index';
import { animated, useSpring } from 'react-spring';
import Data from '~/models/Data';
import { TagContext } from '~/models/PageContext';
import { PageProps } from 'gatsby';

type TagPageProps = PageProps<Data, TagContext>;

export default (props: TagPageProps) => {
  const {
    posts,
    classification,
    cCategories,
    cTags,
    lastUpdatePosts,
    currentPage,
    postsPerPage,
    totalPostsNumber,
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
    <Layout>
      <Helmet title={`${'Tags'} | ${config.siteTitle}`} />
      <L1
        allCategories={allCategories}
        activeTag={classification}
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
          url={'tags/' + classification}
        />
      </L1>
    </Layout>
  );
};
