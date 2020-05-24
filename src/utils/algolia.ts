import Post from '~/models/Post';

const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/blog/" } }
  ) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          tags
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const flatten = (arr: { node: Post }[]) =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

const queries = [
  {
    query: postQuery,
    transformer: ({ data }: { data: { posts: { edges: { node: Post }[] } } }) =>
      flatten(data.posts.edges),
    indexName: `gatsby-blog`,
    settings,
  },
];

export default queries;
