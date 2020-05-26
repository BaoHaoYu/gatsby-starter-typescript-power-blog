const path = require('path');
const _ = require('lodash');
const config = require('./config/SiteConfig').default;
const precss = require('precss');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const gatsbyNode = require('./gatsby-node.ts')

exports.onCreateNode = gatsbyNode.onCreateNode;
exports.createPages = gatsbyNode.createPages;
exports.onCreateWebpackConfig = gatsbyNode.onCreateWebpackConfig;
