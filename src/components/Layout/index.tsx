import React from 'react';
import './index.scss';
import { Container } from '../Container';
import { Header } from './Header/Header';
import { Row, Col } from 'antd';
import { useExceedXs } from '~/utils/media';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'gatsby';

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

interface IProps {
  cTags?: { name: string; len: number }[];
  cCategories?: { name: string; len: number }[];
}

export const Layout: React.FunctionComponent<IProps> = (p) => {
  const exceedXs = useExceedXs();

  return (
    <div className={'Layout'}>
      <Header />

      <div className={'section'}>
        <Container>
          <Row gutter={20}>
            <Col xs={24} md={16}>
              {p.children}
            </Col>
            {exceedXs && (
              <Col md={8}>
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
                          <Link className={'Categories__link'} to={'/categories/' + item.name}>
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
                        <Link to={'/tags/' + item.name} className={'Widget__tag'} key={item.name}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </Widget>

                  <Widget title={'最后更新'}>1</Widget>
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
