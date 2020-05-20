import { Container } from '~/components/Container';
import { Col, Row } from 'antd';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import { useLessMd } from '~/utils/media';
import './Header.scss';

export function Header() {
  const [data, setState] = useState({ expanded: false, search: false });
  function onClickToggle() {
    setState({ ...data, expanded: !data.expanded });
  }
  function onClickSearch() {
    setState({ ...data, search: !data.search });
  }
  const lessMd = useLessMd();
  return (
    <div className={'Header'}>
      <Container>
        <div className={'Header__bar'}>
          <Row>
            <Col xs={18} lg={6}>
              <div className={'Header__logo'}>
                <img src="/assets/logo.png" alt="log" />
              </div>
            </Col>

            <Col hidden={!lessMd} xs={6}>
              <div onClick={onClickToggle} className={'Header__toggle'}>
                <AiOutlineMenu className={'s-icon'} />
              </div>
            </Col>

            <Col hidden={!data.expanded && lessMd} className={'Header__expanded'} xs={24} md={18}>
              <div className={'Header__menu'}>
                <Row align={'middle'}>
                  <Col offset={lessMd ? 0 : 4} xs={24} lg={4}>
                    <div>
                      <a className={'Header__link'} href={'about'}>
                        关于
                      </a>
                    </div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <div>
                      <a className={'Header__link'} href={'tags'}>
                        标签
                      </a>
                    </div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <div>
                      <a className={'Header__link'} href={'/categories'}>
                        分类
                      </a>
                    </div>
                  </Col>
                  <Col xs={24} lg={4}>
                    <a className={'Header__link'} href={'/archives'}>
                      归档
                    </a>
                  </Col>
                  <Col xs={24} lg={4}>
                    <div>
                      <span onClick={onClickSearch} className={'Header__link'}>
                        <AiOutlineSearch className={'s-icon'} />
                      </span>
                    </div>
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
