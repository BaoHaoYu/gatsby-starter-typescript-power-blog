import React from 'react';
import './index.scss';
import { Container } from '../Container';
import { Header } from './Header/Header';
import { Row, Col } from 'antd';
import { useExceedMd } from '~/utils/media';
import { SideBar } from './SideBar/SideBar';

export interface ILayoutProps {
  cTags?: { name: string; len: number }[];
  cCategories?: { name: string; len: number }[];
  showSideBar?: boolean;
  lastUpdatePosts?: {
    slug: string;
    title: string;
    latest_update_date: string;
    date: string;
    banner: string;
  }[];
}

export const Layout: React.FunctionComponent<ILayoutProps> = (p) => {
  const exceedMd = useExceedMd();

  return (
    <div className={'Layout'}>
      <Header />

      <div className={'section'}>
        <Container>
          <Row gutter={exceedMd && p.showSideBar ? 20 : 0}>
            <Col md={24} lg={p.showSideBar ? 16 : 24}>
              {p.children}
            </Col>
            {exceedMd && p.showSideBar && (
              <Col lg={8}>
                <SideBar
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
