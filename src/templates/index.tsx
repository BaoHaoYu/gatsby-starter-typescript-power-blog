import React from 'react';
import { graphql } from 'gatsby';
import { Layout, Article, Pagination } from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Data from '../models/Data';
import '../style/all.scss';
import { Container } from '../components/Container';
import { Layout as L1, ILayoutProps } from '~/components/Layout/index';
import { useSpring, animated } from 'react-spring';

interface IPageContext extends ILayoutProps {
  currentPage: number;
  totalPages: number;
}

interface Props {
  data: Data;
  pageContext: IPageContext;
}

export default (props: Props) => {
  const { currentPage, totalPages, cTags, cCategories, lastUpdatePosts } = props.pageContext;

  const { data } = props;
  const { edges } = data.allMarkdownRemark;
  const articleSpring = useSpring({
    tension: 300,
    delay: 200,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  });
  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />

      <L1
        showSideBar={true}
        cTags={cTags}
        cCategories={cCategories}
        lastUpdatePosts={lastUpdatePosts}
      >
        <Container>
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
