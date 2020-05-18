import React, { useState } from 'react';
import { Row, Col } from 'antd';
import './index.scss';
import { Container } from '../Container';
import cn from 'classnames';

export function Layout(p: { children?: any }) {
  const [data, setState] = useState({ expanded: false, search: false });

  function onClickToggle() {
    setState({ ...data, expanded: !data.expanded });
  }
  function onClickSearch() {
    setState({ ...data, search: !data.search });
  }
  return (
    <div className={'Layout'}>
      <div className={'Header'}>
        <Container>
          <Row>
            <Col xs={18} md={6}>
              <div className={'Header__logo'}>
                <img src="/assets/logo.png" alt="" />
              </div>
            </Col>

            <Col className={cn('hide', 'max-xs-show')} xs={6}>
              <div onClick={onClickToggle} className={'Header__toggle'}>
                菜单
              </div>
            </Col>

            <Col
              className={cn('Header__expanded', {
                'Header__expanded--show': data.expanded,
              })}
              xs={24}
              md={18}
            >
              <div className={'Header__menu'}>
                <Row>
                  <Col xs={24} md={4}>
                    <a className={'Header__link'} href={'about'}>
                      关于
                    </a>
                  </Col>
                  <Col xs={24} md={4}>
                    <a className={'Header__link'} href={'tags'}>
                      标签
                    </a>
                  </Col>
                  <Col xs={24} md={4}>
                    <a className={'Header__link'} href={'tags'}>
                      分类
                    </a>
                  </Col>
                  <Col xs={24} md={4}>
                    <a className={'Header__link'} href={'tags'}>
                      归档
                    </a>
                  </Col>
                  <Col xs={24} md={4}>
                    <a onClick={onClickSearch} className={'Header__link'}>
                      搜索
                    </a>
                  </Col>
                </Row>
              </div>

              {data.search && (
                <div className={'Header__search'}>
                  <input type="text" placeholder={'搜索'} />

                  <button className={'Header__close'} onClick={onClickSearch}>
                    关闭
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Container>{p.children}</Container>

      <div className={'Footer'} />
    </div>
  );
}
