import React from 'react';
import './index.scss';
import { Container } from '../Container';
import { Header } from './Header/Header';
import { Row, Col } from 'antd';
import { useLessLg } from '~/utils/media';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';

interface IWidget {
  children: any;
  title: string;
}

function Widget(props: IWidget) {
  return (
    <div className={'Widget'}>
      <h5 className={'Widget__title'}>
        <span>{props.title}</span>
      </h5>

      {props.children}
    </div>
  );
}

export interface ILayoutProps {
  cTags?: { name: string; len: number }[];
  cCategories?: { name: string; len: number }[];
  lastUpdatePosts?: {
    slug: string;
    title: string;
    latest_update_date: string;
    date: string;
    banner: string;
  }[];
}

export const Layout: React.FunctionComponent<ILayoutProps> = (p) => {
  const exceedXs = useLessLg();

  return (
    <div className={'Layout'}>
      <Header />

      <div className={'section'}>
        <Container>
          <Row gutter={20}>
            <Col md={24} lg={16}>
              {p.children}
            </Col>
            {exceedXs && (
              <Col lg={8}>
                <aside>
                  <Widget title={'搜索'}>
                    <div style={{ position: 'relative' }}>
                      <input
                        name={'search'}
                        placeholder={'回车搜索'}
                        className={'Widget__search'}
                        type={'text'}
                      />

                      <button className={'Widget__goSearch'}>
                        <AiOutlineSearch />
                      </button>
                    </div>
                  </Widget>

                  <Widget title={'分类'}>
                    <ul className={'Categories'}>
                      {p.cCategories?.map((item) => (
                        <li className={'Categories__item'} key={item.name}>
                          <Link
                            className={'Categories__link'}
                            to={'/categories/' + kebabCase(item.name)}
                          >
                            {item.name}
                            <small className={'Categories__len'}>({item.len})</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Widget>

                  <Widget title={'标签'}>
                    <div className={'Widget__tagBox'}>
                      {p.cTags?.map((item) => (
                        <Link
                          to={'/tags/' + kebabCase(item.name)}
                          className={'Widget__tag'}
                          key={item.name}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </Widget>

                  <Widget title={'最后更新'}>
                    <ul className={'LastUpdate'}>
                      {p.lastUpdatePosts?.map((post) => (
                        <li className={'LastUpdate__item'} key={post.slug}>
                          <Row gutter={12}>
                            <Col span={6}>
                              <img
                                className={'LastUpdate__banner'}
                                src={post.banner}
                                alt={post.title}
                              />
                            </Col>
                            <Col span={18}>
                              <h5>
                                <Link className={'LastUpdate__link'} to={'/blog/' + post.slug}>
                                  {post.title}
                                </Link>
                              </h5>

                              <small>{post.latest_update_date}</small>
                            </Col>
                          </Row>
                        </li>
                      ))}
                    </ul>
                  </Widget>
                </aside>
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <div className={'Footer'} />
    </div>
  );
};
