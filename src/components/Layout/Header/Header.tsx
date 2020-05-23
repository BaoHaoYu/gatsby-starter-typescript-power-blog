import { Container } from '~/components/Container';
import { Col, Row } from 'antd';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import { useLessMd } from '~/utils/media';
import './Header.scss';
import { Link } from 'gatsby';
import { useSprings, animated } from 'react-spring';

export function Header() {
  const [data, setState] = useState({ expanded: false, search: false });
  function onClickToggle() {
    setState({ ...data, expanded: !data.expanded });
  }
  function onClickSearch() {
    setState({ ...data, search: !data.search });
  }
  const lessMd = useLessMd();

  const [headSprings] = useSprings(6, (index) => ({
    delay: 200 + 100 * index,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-10px)' },
  }));

  return (
    <div className={'Header'}>
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
              <div onClick={onClickToggle} className={'Header__toggle'}>
                <AiOutlineMenu className={'s-icon'} />
              </div>
            </Col>

            <Col hidden={!data.expanded && lessMd} className={'Header__expanded'} xs={24} lg={18}>
              <div className={'Header__menu'}>
                <Row align={'middle'}>
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
                  <Col xs={24} lg={4}>
                    <animated.div style={headSprings[5]}>
                      <span onClick={onClickSearch} className={'Header__link'}>
                        <AiOutlineSearch className={'s-icon'} />
                      </span>
                    </animated.div>
                  </Col>
                </Row>
              </div>

              {data.search && (
                <div className={'Header__search'}>
                  <input type="text" placeholder={'搜索'} />

                  <span className={'Header__close'} onClick={onClickSearch}>
                    <AiOutlineClose className={'s-icon'} />
                  </span>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
