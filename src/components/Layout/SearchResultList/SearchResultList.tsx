import { HistItem } from '~/models/Search';
import { animated } from 'react-spring';
import { kebabCase } from 'lodash';
import React from 'react';
import './SearchResultList.scss';
import { observer } from 'mobx-react';
import useSpringState from '~/components/useSpringState';
import { Link } from 'gatsby';

export const SearchResultList: React.FunctionComponent<{
  showSearch: boolean;
  hits?: HistItem[];
  style?: React.CSSProperties;
  className?: string;
}> = observer((props) => {
  const searchResult = useSpringState(props.showSearch, {
    delay: 100,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
    reverse: !props.showSearch || !props.hits,
  });

  return (
    <animated.div style={searchResult.spring}>
      {searchResult.state !== 'exited' && props.hits && (
        <div style={props.style} className={'SearchResult'}>
          {props.hits?.map((hit) => {
            return (
              <div className={'SearchResult__item'} key={hit.title}>
                <Link className={'SearchResult__title'} to={'/blog/' + hit.fields.slug}>
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.title.value,
                    }}
                  />
                </Link>

                <div className={'SearchResult__metas'}>
                  {hit._highlightResult.tags && (
                    <span className={'SearchResult__meta'}>
                      标签:{' '}
                      {hit._highlightResult.tags.map((item, index) => (
                        <Link
                          className={'SearchResult__metaLink'}
                          to={'/tags/' + kebabCase(hit.tags && hit.tags[index])}
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: item.value,
                          }}
                        />
                      ))}
                    </span>
                  )}

                  {hit._highlightResult.categories && (
                    <span className={'SearchResult__meta'}>
                      分类:{' '}
                      {hit._highlightResult.categories.map((item, index) => (
                        <Link
                          className={'SearchResult__metaLink'}
                          to={'/categories/' + kebabCase(hit.categories && hit.categories[index])}
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: item.value,
                          }}
                        />
                      ))}
                    </span>
                  )}
                </div>

                {hit._highlightResult.description && (
                  <div
                    className={'SearchResult__description'}
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.description.value,
                    }}
                  />
                )}

                {hit._snippetResult.excerpt.matchLevel !== 'none' && (
                  <div
                    className={'SearchResult__excerpt'}
                    dangerouslySetInnerHTML={{ __html: hit._snippetResult.excerpt.value }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </animated.div>
  );
});
