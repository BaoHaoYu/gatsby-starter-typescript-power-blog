import { HistItem } from '~/models/Search';
import { animated, useSpring } from 'react-spring';
import { kebabCase } from 'lodash';
import React, { useEffect, useState, CSSProperties } from 'react';
import './SearchResultList.scss';
import { observer } from 'mobx-react';
import { UseSpringProps } from 'react-spring/web';

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B;

function useSpringMount<DS extends object>(
  start: boolean,
  springProps: UseSpringProps<Merge<DS, CSSProperties>>,
) {
  const [state, setState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  useEffect(() => {
    if (start) {
      setState('entering');
    } else {
      setState('exiting');
    }
  }, [start]);

  const spring = useSpring({
    ...springProps,
    onRest(ds) {
      if (start) {
        setState('entered');
      } else {
        setState('exited');
      }
      if (springProps.onRest) {
        springProps.onRest(ds);
      }
    },
  });

  return [spring, state];
}

export const SearchResultList = observer((props: { showSearch: boolean; hits?: HistItem[] }) => {
  const [state, setState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  useEffect(() => {
    if (props.showSearch) {
      setState('entering');
    } else {
      setState('exiting');
    }
  }, [props.showSearch]);

  const searchResultSpring = useSpring({
    delay: 100,
    opacity: 1,
    reverse: !props.showSearch || !props.hits,
    transform: 'translateY(0)',
    onRest() {
      if (props.showSearch) {
        setState('entered');
      } else {
        setState('exited');
      }
    },
    from: { opacity: 0, transform: 'translateY(60px)' },
  });

  return (
    <animated.div style={searchResultSpring}>
      {state !== 'exited' && props.hits && (
        <div className={'SearchResult'}>
          {props.hits?.map((hit) => {
            return (
              <div className={'SearchResult__item'} key={hit.title}>
                <a className={'SearchResult__title'} href={'/blog/' + hit.fields.slug}>
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.title.value,
                    }}
                  />
                </a>

                <div className={'SearchResult__metas'}>
                  {hit._highlightResult.tags && (
                    <span className={'SearchResult__meta'}>
                      标签:{' '}
                      {hit._highlightResult.tags.map((item, index) => (
                        <a
                          className={'SearchResult__metaLink'}
                          role={'button'}
                          href={'/tags/' + kebabCase(hit.tags && hit.tags[index])}
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
                        <a
                          className={'SearchResult__metaLink'}
                          role={'button'}
                          href={'/categories/' + kebabCase(hit.categories && hit.categories[index])}
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
