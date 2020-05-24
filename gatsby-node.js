const path = require('path');
const _ = require('lodash');
const config = require('./config/SiteConfig').default;
const precss = require('precss');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (
    node.internal.type === 'MarkdownRemark' &&
    _.has(node, 'frontmatter') &&
    _.has(node.frontmatter, 'title')
  ) {
    const slug = `${_.kebabCase(node.frontmatter.title)}`;
    createNodeField({ node, name: 'slug', value: slug });
  }
};

const getPostsByType = (posts, classificationType) => {
  const postsByType = {};
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
};

// 标签分类页面
const createClassificationPages = ({ createPage, posts, postsPerPage, cTags, cCategories, lastUpdatePosts }) => {
  const classifications = [
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

    // 所有标签或者分类
    createPage({
      path: _.kebabCase(`/${classification.pluralName}`),
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort()
      },
    });

    // 更具标签或者分类划分的列表
    names.forEach((name) => {
      const posts = classification.postsByClassificationNames[name]
      const numPages = Math.ceil(posts.length / postsPerPage);

      _.chunk(posts, postsPerPage).forEach((onePagePosts, i)=>{
        const path = `/${classification.pluralName}/${_.kebabCase(name)}`
        createPage({
          path: i=== 0 ? path : `${path}/${i}`,
          component: classification.template.part,
          context: {
            posts: onePagePosts,
            [`${classification.singularName}Name`]: name,
            cTags,
            cCategories,
            lastUpdatePosts,
            totalPages: numPages,
            currentPage: i + 1,
          },
        });
      })
    });
  });
};

function countArray(posts, key) {
  const item = []
  const list = []
  posts.forEach(({node}, index) => {
    if(node.frontmatter[key]) {
      node.frontmatter[key].forEach(name => {
        item.push({name: name})
      })
    }
  })
  if(item.length === 0){
    return  []
  }
  const gTags = _.groupBy(item, 'name')

  _.map(gTags, (tag, name) => {
    list.push({
      name,
      len: tag.length
    })
  })
  return list;
}

// 首页
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/Post.tsx`);

  return graphql(`
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
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = config.POST_PER_PAGE;
    const numPages = Math.ceil(posts.length / postsPerPage);

    const cTags = countArray(posts, 'tags');
    const cCategories = countArray(posts, 'categories');

    let lastUpdatePosts = _.filter(posts, ({ node }) => node.frontmatter.latest_update_date)
    lastUpdatePosts = _.sortBy(lastUpdatePosts, ({ node }) => node.frontmatter.latest_update_date)
    lastUpdatePosts = lastUpdatePosts.map(({ node })=>{
      return {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        latest_update_date: node.frontmatter.latest_update_date,
        date: node.frontmatter.date,
        banner: node.frontmatter.banner
      }
    })
    lastUpdatePosts = lastUpdatePosts.reverse().slice(0, 3)

    // 分页
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/blog/${i + 1}`,
        component: path.resolve('./src/templates/index.tsx'),
        context: {
          cTags,
          cCategories,
          lastUpdatePosts,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          currentPage: i + 1,
        },
      });
    });

    createClassificationPages({ createPage, posts, postsPerPage, numPages, cTags, cCategories, lastUpdatePosts });

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

const isProduction = false
exports.onCreateWebpackConfig = (p) => {
  const {
    stage,
    rules,
    loaders,
    plugins,
    actions,
  } = p
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            loaders.miniCssExtract(),
            loaders.css({ importLoaders: 1 }),
            {
              loader: path.join(__dirname, 'loader/css-map-loader/index.js'),
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                plugins() {
                  return [precss]
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [new TsconfigPathsPlugin()],
    },
  })
}
