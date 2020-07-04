import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, PageProps } from 'gatsby';
import { Layout, SEO } from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import { Post as PostMain } from '~/components/Post';
import { PostContext } from '~/models/PageContext';
import Post from '~/models/Post';

type PostPageProps = PageProps<{ markdownRemark: Post }, PostContext>;

// 文章页
export default (props: PostPageProps) => {
  const { prev, next } = props.pageContext;
  const post = props.data.markdownRemark;
  return (
    <Layout>
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
            prev={prev}
            next={next}
          />
        </>
      ) : null}
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
