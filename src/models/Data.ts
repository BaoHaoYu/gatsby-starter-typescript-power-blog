import AllMarkdownRemark from './AllMarkdownRemark';
import Post from '~/models/Post';

export interface SideBarFromServer {
  cTags?: { name: string; len: number }[];
  cCategories?: { name: string; len: number }[];
  lastUpdatePosts?: Post[];
}

interface Data {
  allMarkdownRemark: AllMarkdownRemark;
}

export default Data;
