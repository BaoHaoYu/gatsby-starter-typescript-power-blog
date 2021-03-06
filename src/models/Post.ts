import Frontmatter from './Frontmatter';

interface Post {
  id: string;
  excerpt: string;
  html: string;
  frontmatter: Frontmatter;
  fields: {
    slug: string;
  };
  timeToRead: number;
}

export default Post;
