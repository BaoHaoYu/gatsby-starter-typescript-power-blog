import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
// import { kebabCase } from 'lodash';
import {
  Layout,
  // Wrapper,
  // Header,
  // Subline,
  SEO,
  // PrevNext,
  // SectionTitle,
  // Content,
} from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import PathContext from '../models/PathContext';
import Post from '../models/Post';
import { Col, Row } from 'antd';
import { Post as PostMain } from '~/components/Post';
import { Layout as L1 } from '~/components/Layout/index';
interface Props {
  data: {
    markdownRemark: Post;
  };
  pathContext: PathContext;
}

export default (props: Props) => {
  const { prev, next } = props.pathContext;
  const post = props.data.markdownRemark;

  return (
    <Layout>
      <L1>
        {post ? (
          <>
            <SEO postPath={post.fields.slug} postNode={post} postSEO={true} />
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <PostMain
              title={post.frontmatter.title}
              categories={post.frontmatter.categories}
              date={post.frontmatter.date}
              tags={post.frontmatter.tags}
              banner={post.frontmatter.banner}
              latestUpdateDate={post.frontmatter.latest_update_date}
              slug={post.fields.slug}
              content={post.html}
              timeToRead={post.timeToRead}
            />
          </>
        ) : null}
      </L1>
    </Layout>
  );
};

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        category
        tags
        banner
      }
      timeToRead
    }
  }
`;
