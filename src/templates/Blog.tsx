import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout, Article, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Data from '../models/Data';
import { IndexContext } from '~/models/PageContext';
import { animated, useSpring } from 'react-spring';

type IndexPageProps = PageProps<Data, IndexContext>;

// 首页文章分页
export default (props: IndexPageProps) => {
  const { data, pageContext } = props;
  const { edges } = data.allMarkdownRemark;
  const articleSpring = useSpring({
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });
  const { allCategories } = props.pageContext;

  return (
    <Layout
      allCategories={allCategories}
      showSideBar={true}
      cTags={pageContext.cTags}
      cCategories={pageContext.cCategories}
      lastUpdatePosts={pageContext.lastUpdatePosts}
    >
      <Helmet title={`Blog | ${config.siteTitle}`} />

      <animated.div style={articleSpring}>
        {edges.map((post) => (
          <Article
            key={post.node.fields.slug}
            description={post.node.frontmatter.description}
            banner={post.node.frontmatter.banner}
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            tags={post.node.frontmatter.tags}
            categories={post.node.frontmatter.categories}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
          />
        ))}
      </animated.div>

      <Pagination
        itemPerPage={pageContext.postsPerPage}
        totalItemNumber={pageContext.totalPostsNumber}
        currentPage={pageContext.currentPage}
        url={'blog'}
        firstPage={'/'}
      />
    </Layout>
  );
};

export const BlogQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
