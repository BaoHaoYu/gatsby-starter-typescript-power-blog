import React from 'react';
import { Container } from '../Container';
import { Header } from './Header/Header';
import { Row, Col } from 'antd';
import { useExceedMd } from '~/utils/media';
import { SideBar, SideBarProps } from './SideBar/SideBar';

export interface ILayoutProps extends SideBarProps {
  showSideBar?: boolean;
  allCategories?: string[][];
}

export const Layout: React.FunctionComponent<ILayoutProps> = (p) => {
  const exceedMd = useExceedMd();
  return (
    <div className={'Layout'}>
      <Header />

      <div className={'section'}>
        <Container>
          <Row gutter={exceedMd && p.showSideBar ? 30 : 0}>
            <Col span={24} lg={p.showSideBar ? 16 : 24}>
              {p.children}
            </Col>
            {exceedMd && p.showSideBar && (
              <Col lg={8}>
                <SideBar
                  allCategories={p.allCategories}
                  activeTag={p.activeTag}
                  activeCategory={p.activeCategory}
                  cTags={p.cTags}
                  cCategories={p.cCategories}
                  lastUpdatePosts={p.lastUpdatePosts}
                />
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <div className={'Footer'} />
    </div>
  );
};
