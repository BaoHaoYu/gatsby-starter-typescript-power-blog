import { Container } from '~/components/Container';
import { Col, Row, Spin, Input } from 'antd';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import { useLessMd } from '~/utils/media';
import './Header.scss';
import { Link } from 'gatsby';
import { useSprings, useSpring, animated } from 'react-spring';
import algoliaSearch from 'algoliasearch/lite';
import { SearchResult, HistItem } from '~/models/Search';
import { SearchResultList } from '../SearchResultList/SearchResultList';
export function Header() {
  const [state, setState] = useState<{
    expandedMenu: boolean;
    showSearch: boolean;
    searchIng: boolean;
    searchValue: string;
    hits?: HistItem[];
  }>({
    expandedMenu: false,
    showSearch: false,
    searchIng: true,
    searchValue: '',
  });
  function onToggleExpandedMenu() {
    setState({ ...state, expandedMenu: !state.expandedMenu });
  }
  function onToggleSearch() {
    setState({
      ...state,
      showSearch: !state.showSearch,
      searchIng: !state.showSearch ? false : state.searchIng,
    });
  }
  function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, searchValue: e.target.value });
  }
  function setSearchIng(searchIng: boolean) {
    setState({ ...state, searchIng });
  }
  function setSearchResult(data?: SearchResult) {
    setState({ ...state, searchIng: false, hits: data ? data.results[0].hits : undefined });
  }

  function onSearch() {
    if (/^\s+$/.test(state.searchValue) || state.searchIng) {
      return;
    }

    if (
      !process.env.ALGOLIA_APP_ID ||
      !process.env.ALGOLIA_SEARCH_KEY ||
      !process.env.ALGOLIA_INDEX_NAME
    ) {
      return;
    }
    const searchAPI = algoliaSearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);

    setSearchIng(true);

    searchAPI
      .search<HistItem>([
        {
          indexName: process.env.ALGOLIA_INDEX_NAME,
          params: { page: 0 },
          query: state.searchValue,
        },
      ])
      .then((result) => {
        setSearchResult(result);
      });
  }
  function preventDefault(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }
  const lessMd = useLessMd();

  const [headSprings] = useSprings(6, (index) => ({
    delay: 200 + 100 * index,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-10px)' },
  }));

  const searchBarSpring = useSpring({
    delay: 100,
    opacity: 1,
    reverse: !state.showSearch,
    transform: 'translateY(60px)',
    from: { opacity: 0.5, transform: 'translateY(0px)' },
  });

  const searchResultListNode = (
    <div style={{ width: lessMd ? '100%' : 'auto' }} className={'SearchResult--layout'}>
      <SearchResultList hits={state.hits} showSearch={state.showSearch && !state.searchIng} />
    </div>
  );

  const searchNode = (
    <Col xs={24} lg={4} style={{ zIndex: 10 }}>
      <animated.div style={headSprings[5]}>
        <span onClick={state.showSearch ? onSearch : onToggleSearch} className={'Header__link'}>
          <AiOutlineSearch className={'s-icon'} />
        </span>
      </animated.div>
      {lessMd && searchResultListNode}
    </Col>
  );

  return (
    <div className={'Header'} onClick={preventDefault}>
      <Container>
        <div className={'Header__bar'}>
          <Row>
            <Col xs={18} lg={6}>
              <animated.div style={headSprings[0]} className={'Header__logo'}>
                <Link to={'/'}>
                  <img src="/assets/logo.png" alt="log" />
                </Link>
              </animated.div>
            </Col>

            <Col hidden={!lessMd} xs={6}>
              <div onClick={onToggleExpandedMenu} className={'Header__toggle'}>
                <AiOutlineMenu className={'s-icon'} />
              </div>
            </Col>

            <Col
              hidden={!state.expandedMenu && lessMd}
              className={'Header__expanded'}
              xs={24}
              lg={18}
            >
              <div className={'Header__menu'}>
                <Row align={'middle'}>
                  {lessMd && searchNode}

                  <Col offset={lessMd ? 0 : 4} xs={24} lg={4}>
                    <animated.div style={headSprings[1]}>
                      <a className={'Header__link'} href={'about'}>
                        关于
                      </a>
                    </animated.div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <animated.div style={headSprings[2]}>
                      <a className={'Header__link'} href={'tags'}>
                        标签
                      </a>
                    </animated.div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <animated.div style={headSprings[3]}>
                      <a className={'Header__link'} href={'/categories'}>
                        分类
                      </a>
                    </animated.div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <animated.div style={headSprings[4]}>
                      <a className={'Header__link'} href={'/archives'}>
                        归档
                      </a>
                    </animated.div>
                  </Col>

                  {!lessMd && searchNode}
                </Row>
              </div>
            </Col>

            <div className={'Header__top'}>
              <animated.div style={searchBarSpring}>
                <div className={'Header__search'}>
                  {state.searchIng && (
                    <div className={'Header__spin'}>
                      <Spin />
                    </div>
                  )}

                  <Input
                    disabled={state.searchIng}
                    onKeyPress={(e) => e.charCode === 13 && onSearch()}
                    onChange={onChangeSearchValue}
                    value={state.searchValue}
                    name={'search'}
                    type={'search'}
                    placeholder={'搜索'}
                  />

                  <span className={'Header__close'} onClick={onToggleSearch}>
                    <AiOutlineClose className={'s-icon'} />
                  </span>
                </div>
              </animated.div>
            </div>
          </Row>

          {!lessMd && searchResultListNode}
        </div>
      </Container>
    </div>
  );
}
