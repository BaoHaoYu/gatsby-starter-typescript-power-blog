import React from 'react';
import { graphql } from 'gatsby';
import { Layout, Article, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Data from '../models/Data';
import '../style/all.scss';
import { Container } from '../components/Container';
import { Layout as L1 } from '~/components/Layout/index';
interface Props {
  data: Data;
  pageContext: {
    currentPage: number;
    totalPages: number;
    cTags: { name: string; len: number }[];
    cCategories: { name: string; len: number }[];
  };
}

export default (props: Props) => {
  const { currentPage, totalPages, cTags, cCategories } = props.pageContext;

  const { data } = props;
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />

      <L1 cTags={cTags} cCategories={cCategories}>
        <Container>
          {edges.map((post) => (
            <Article
              banner={post.node.frontmatter.banner}
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              timeToRead={post.node.timeToRead}
              slug={post.node.fields.slug}
              category={post.node.frontmatter.category}
              key={post.node.fields.slug}
            />
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} url={'blog'} />
        </Container>
      </L1>
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
            date(formatString: "YYYY-MM-DD")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
