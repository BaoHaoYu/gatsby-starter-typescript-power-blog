import FrontMatter from './Frontmatter';

import { MultipleQueriesResponse } from '@algolia/client-search';

interface HitMatch {
  matchLevel: string;
  value: string;
  matchedWords: string[];
}

interface HighlightResult extends Record<keyof FrontMatter, HitMatch> {
  fields: {
    slug: HitMatch;
  };
}

export interface HistItem extends FrontMatter {
  objectID: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  _highlightResult: HighlightResult;
  _snippetResult: {
    excerpt: {
      matchLevel: string;
      value: string;
    };
  };
}

export type SearchResult = MultipleQueriesResponse<HistItem>;
