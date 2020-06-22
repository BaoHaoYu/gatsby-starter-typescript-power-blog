import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { Col, Row } from 'antd';
import './SideBar.scss';
import { useSprings, animated } from 'react-spring';
import cn from 'classnames';
import { SideBarFromServer } from '~/models/Data';
import { toList, Tree } from '~/templates/AllCategory';

export interface SideBarProps extends SideBarFromServer {
  activeTag?: string;
  activeCategory?: string;
  allCategories?: string[][];
}

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

export function SideBar(p: SideBarProps & { children?: React.ReactNode }) {
  const [sideBarSprings] = useSprings(4, (index) => ({
    delay: 100 + 150 * index,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
  }));
  const list = toList(p.allCategories || [], p.activeCategory);
  console.log(list);
  return (
    <aside>
      <animated.div style={sideBarSprings[0]}>
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
      </animated.div>

      <animated.div style={sideBarSprings[1]}>
        <Widget title={'分类'}>
          <Tree fontSize={16} list={list} open={true} />
        </Widget>
      </animated.div>

      <animated.div style={sideBarSprings[2]}>
        <Widget title={'标签'}>
          <div className={'Widget__tagBox'}>
            {p.cTags?.map((item) => (
              <Link
                to={'/tags/' + kebabCase(item.name)}
                className={cn('Widget__tag', { 'Widget__tag--active': p.activeTag === item.name })}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Widget>
      </animated.div>

      <animated.div style={sideBarSprings[3]}>
        <Widget title={'最后更新'}>
          <ul className={'LastUpdate'}>
            {p.lastUpdatePosts?.map((post) => (
              <li className={'LastUpdate__item'} key={post.fields.slug}>
                <Row gutter={12}>
                  <Col span={6}>
                    <img
                      className={'LastUpdate__banner'}
                      src={post.frontmatter.banner}
                      alt={post.frontmatter.title}
                    />
                  </Col>
                  <Col span={18}>
                    <h5>
                      <Link className={'LastUpdate__link'} to={'/blog/' + post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </h5>

                    <small>{post.frontmatter.latest_update_date}</small>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </Widget>
      </animated.div>
    </aside>
  );
}
