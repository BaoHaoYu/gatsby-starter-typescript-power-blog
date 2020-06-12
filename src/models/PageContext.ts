import Post from './Post';

interface PageIndex {
  totalPages: number;
  totalPostsNumber: number;
  currentPage: number;
  postsPerPage: number;
}

interface IndexCommon {
  cTags: { name: string; len: number }[];
  cCategories: { name: string; len: number }[];
  lastUpdatePosts: Post[];
  allCategories: string[][];
}

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

export interface IndexContext extends PageIndex, IndexCommon {
  limit: number;
  skip: number;
}

export interface AllCategoryContext {
  allCategories: string[][];
}

export interface CategoryContext extends PageIndex, IndexCommon {
  classification: string;
  posts: Post[];
}

export interface TagContext extends PageIndex, IndexCommon {
  classification: string;
  posts: Post[];
}

export interface BlogContext {
  slug: string;
  prev: Post;
  next: Post;
}
