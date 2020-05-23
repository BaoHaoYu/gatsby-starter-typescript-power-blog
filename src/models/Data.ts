import AllMarkdownRemark from './AllMarkdownRemark';

export interface SideBarFromServer {
  cTags?: { name: string; len: number }[];
  cCategories?: { name: string; len: number }[];
  lastUpdatePosts?: {
    slug: string;
    title: string;
    latest_update_date: string;
    date: string;
    banner: string;
  }[];
}

interface Data {
  allMarkdownRemark: AllMarkdownRemark;
}

export default Data;
