import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Article, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Data from '../models/Data';
import '../style/all.scss';
import { Layout } from '~/components/Layout/index';
import { useSpring, animated } from 'react-spring';
import { IndexContext } from '~/models/PageContext';

type IndexPageProps = PageProps<Data, IndexContext>;

// 首页
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

export const IndexQuery = graphql`
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
            banner
            description
            date(formatString: "YYYY-MM-DD")
            latest_update_date(formatString: "YYYY-MM-DD")
            categories
            tags
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
