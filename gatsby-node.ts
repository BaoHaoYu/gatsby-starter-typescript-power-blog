import { GatsbyNode, Actions } from 'gatsby';
import Post from '~/models/Post';
import path from 'path';
import _ from 'lodash';
import Data from '~/models/Data';
import config from './config/SiteConfig';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

interface NodePost {
  node: Post;
}

interface LastUpdatePost {
  slug: string;
  title: string;
  latest_update_date?: string;
  date?: string;
  banner?: string;
}

// 根据 classificationType 对所有的文章进行分类
function getPostsByType(posts: NodePost[], classificationType: 'categories' | 'tags') {
  const postsByType: { [P in string]: Post[] } = {};
  posts.forEach(({ node }) => {
    const nodeClassificationType = node.frontmatter[classificationType];
    if (nodeClassificationType) {
      if (_.isArray(nodeClassificationType)) {
        nodeClassificationType.forEach((name) => {
          if (!_.has(postsByType, name)) {
            postsByType[name] = [];
          }
          postsByType[name].push(node);
        });
      } else {
        const name = nodeClassificationType;
        if (!postsByType[name]) {
          postsByType[name] = [];
        }
        postsByType[name].push(node);
      }
    }
  });
  return postsByType;
}

// 统计所有分类和标签
function countArray(
  posts: { node: Post }[],
  key: 'categories' | 'tags',
): { name: string; len: number }[] {
  const item: string[] = [];
  const list: { name: string; len: number }[] = [];
  posts.map(({ node }) => {
    if (node.frontmatter[key]) {
      node.frontmatter[key]?.forEach((name) => {
        item.push(name);
      });
    }
  });
  if (item.length === 0) {
    return [];
  }
  const count = _.countBy(item);

  _.map(count, (countValue, countKey) => {
    list.push({
      name: countKey,
      len: countValue,
    });
  });
  return list;
}

// 标签分类页面
function createClassificationPages(p: {
  createPage: Actions['createPage'];
  posts: { node: Post }[];
  postsPerPage: number;
  numPages: number;
  cTags: { name: string; len: number }[];
  cCategories: { name: string; len: number }[];
  lastUpdatePosts: LastUpdatePost[];
}) {
  const { createPage, posts, postsPerPage, cTags, cCategories, lastUpdatePosts } = p;
  const classifications: {
    singularName: string;
    pluralName: string;
    template: {
      part: string;
      all: string;
    };
    postsByClassificationNames: { [x: string]: Post[] };
  }[] = [
    {
      singularName: 'category',
      pluralName: 'categories',
      template: {
        part: path.resolve(`src/templates/Category.tsx`),
        all: path.resolve(`src/templates/AllCategory.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'categories'),
    },
    {
      singularName: 'tag',
      pluralName: 'tags',
      template: {
        part: path.resolve(`src/templates/Tag.tsx`),
        all: path.resolve(`src/templates/AllTag.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'tags'),
    },
  ];

  classifications.forEach((classification) => {
    const names = Object.keys(classification.postsByClassificationNames);
    const allCategories: any[] = [];
    if (classification.singularName === 'category') {
      posts.map(({ node }) => {
        if (node.frontmatter.categories) {
          allCategories.push(node.frontmatter.categories);
        }
      });
    }

    // 所有标签或者分类
    createPage({
      path: _.kebabCase(`/${classification.pluralName}`),
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort(),
        allCategories,
      },
    });

    // 更具标签或者分类划分的列表
    names.forEach((name) => {
      const groupPosts = classification.postsByClassificationNames[name];
      const chunk = _.chunk(groupPosts, postsPerPage);
      chunk.forEach((onePagePosts, i) => {
        const sitePath = `/${classification.pluralName}/${_.kebabCase(name)}`;
        createPage({
          path: i === 0 ? sitePath : `${sitePath}/${i + 1}`,
          component: classification.template.part,
          context: {
            [`${classification.singularName}Name`]: name,
            posts: onePagePosts,
            cTags,
            cCategories,
            lastUpdatePosts,
            postsPerPage,
            totalPostsNumber: groupPosts.length,
            totalPages: chunk.length,
            currentPage: i + 1,
          },
        });
      });
    });
  });
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const tNode = node as Post & typeof node;
  const { createNodeField } = actions;
  if (
    tNode.internal.type === 'MarkdownRemark' &&
    _.has(tNode, 'frontmatter') &&
    _.has(tNode.frontmatter, 'title')
  ) {
    const slug = `${_.kebabCase(tNode.frontmatter.title)}`;
    createNodeField({ node: tNode, name: 'slug', value: slug });
  }
};

export const createPages: GatsbyNode['createPages'] = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/Post.tsx`);
  return graphql<Data>(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 10000) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              slug
            }
            frontmatter {
              date
              description
              latest_update_date
              title
              category
              categories
              tags
              banner
            }
            timeToRead
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors || !result.data) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = config.POST_PER_PAGE;
    const numPages = Math.ceil(posts.length / postsPerPage);

    const cTags = countArray(posts, 'tags');
    const cCategories = countArray(posts, 'categories');

    const lastUpdatePosts1 = _.filter(
      posts,
      ({ node }: NodePost) => node.frontmatter.latest_update_date,
    ) as NodePost[];
    const lastUpdatePosts2 = _.sortBy(
      lastUpdatePosts1,
      ({ node }: NodePost) => node.frontmatter.latest_update_date,
    );
    let lastUpdatePosts: LastUpdatePost[] = lastUpdatePosts2.map(({ node }) => {
      return {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        latest_update_date: node.frontmatter.latest_update_date,
        date: node.frontmatter.date,
        banner: node.frontmatter.banner,
      };
    });
    lastUpdatePosts = lastUpdatePosts.reverse().slice(0, 3);

    // 分页
    Array.from({ length: numPages }).forEach((_n, i) => {
      createPage({
        path: i === 0 ? `/` : `/blog/${i + 1}`,
        component: path.resolve('./src/templates/index.tsx'),
        context: {
          cTags,
          cCategories,
          lastUpdatePosts,
          postsPerPage,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          totalPostsNumber: posts.length,
          currentPage: i + 1,
        },
      });
    });

    createClassificationPages({
      createPage,
      posts,
      postsPerPage,
      numPages,
      cTags,
      cCategories,
      lastUpdatePosts,
    });

    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;

      // 文章内容
      createPage({
        path: `/blog/${_.kebabCase(node.frontmatter.title)}`,
        component: postTemplate,
        context: {
          slug: _.kebabCase(node.frontmatter.title),
          prev,
          next,
        },
      });
    });
  });
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = (p) => {
  const { loaders, actions } = p;
  const isProduction = process.env.NODE_ENV === 'production';

  actions.setWebpackConfig({
    module: {
      rules: [
        ...(!isProduction
          ? [
              {
                test: /\.scss/,
                use: [
                  loaders.miniCssExtract(),
                  loaders.css({ importLoaders: 1 }),
                  {
                    loader: path.join(__dirname, 'loader/css-map-loader/index.js'),
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: !isProduction,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};
