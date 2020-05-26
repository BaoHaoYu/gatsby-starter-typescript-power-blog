import Post from './Post';

interface PathContext {
  tags?: string[];
  categories?: string[];
  allCategories?: [string][];
  categoryName: string;
  tagName?: string;
  posts?: Post[];
  next?: Post;
  prev?: Post;
}

export default PathContext;
