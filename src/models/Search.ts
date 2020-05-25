import FrontMatter from './Frontmatter';

import { MultipleQueriesResponse } from '@algolia/client-search';

interface HighlightItem {
  matchLevel: 'none' | 'full';
  value: string;
  matchedWords: string[];
}

interface SnippetResultItem {
  matchLevel: 'none' | 'full';
  value: string;
}

interface HighlightResult extends Record<keyof FrontMatter, any> {
  fields: {
    slug: HighlightItem;
  };
  excerpt: HighlightItem;
  tags: HighlightItem[];
  categories: HighlightItem[];
}

interface SnippetResult {
  excerpt: SnippetResultItem;
}

export interface HistItem extends FrontMatter {
  objectID: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  _highlightResult: HighlightResult;
  _snippetResult: SnippetResult;
}

export type SearchResult = MultipleQueriesResponse<HistItem>;
