interface Frontmatter {
  date: string;
  title: string;
  category: string;
  categories: string[];
  tags: string[];
  latest_update_date?: string;
  banner?: string;
  description?: string;
}

export default Frontmatter;
