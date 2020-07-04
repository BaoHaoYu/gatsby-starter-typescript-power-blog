import Post from './Post';

/**
 * 分页
 */
interface PageIndex {
  totalPostsNumber: number;
  currentPage: number;
  postsPerPage: number;
}

/**
 * 首页布局通用
 */
interface IndexCommon {
  cTags: { name: string; len: number }[];
  cCategories: { name: string; len: number }[];
  lastUpdatePosts: Post[];
  allCategories: string[][];
}

/**
 * 文章主体页
 */
export interface PostContext {
  tags?: string[];
  categories?: string[];
  allCategories?: string[][];
  categoryName: string;
  tagName?: string;
  posts?: Post[];
  next?: Post;
  prev?: Post;
}

/**
 * 首页
 */
export interface IndexContext extends PageIndex, IndexCommon {
  limit: number;
  skip: number;
}

export interface AllCategoryContext {
  allCategories: string[][];
}

/**
 * 分类筛选页
 */
export interface CategoryContext extends PageIndex, IndexCommon {
  classification: string;
  posts: Post[];
}

/**
 * 标签筛选页
 */
export interface TagContext extends PageIndex, IndexCommon {
  classification: string;
  posts: Post[];
}

/**
 * 归档页
 */
export interface ArchivesContext extends PageIndex {
  posts: { node: Post }[];
}
