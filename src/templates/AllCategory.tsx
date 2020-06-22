import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { Layout } from '../components/Layout/index';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import update from 'lodash/update';
import map from 'lodash/map';
import { TreeNode } from '~/components/Tree/TreeNode';
import { useSpring, animated } from 'react-spring';

type ResultObject = { [K: string]: boolean | ResultObject };
type ResultList = { name: string; children?: ResultList; hasActive?: boolean; active?: boolean }[];

export function toList(allCategories: string[][], activeId?: string): ResultList {
  const result: any = {};
  if (allCategories) {
    allCategories.map((postCategories) => {
      if (!postCategories) return;
      const key = postCategories.join('.');
      update(result, key, () => true);
    });
  }

  function deepToList(_result: ResultObject) {
    const resultList: ResultList = [];
    let hasActive = false;

    map(_result, (value: boolean | ResultObject, key) => {
      let active = false;
      if (key === activeId) {
        hasActive = true;
        active = true;
      }
      if (typeof value === 'boolean') {
        resultList.push({
          name: key,
          active,
        });
      } else if (typeof value === 'object') {
        const deepResult = deepToList(value);
        resultList.push({
          name: key,
          children: deepResult.list,
          hasActive: deepResult.hasActive,
          active,
        });
      }
    });

    return {
      list: resultList,
      hasActive,
    };
  }
  return deepToList(result).list;
}

export function Tree(props: { list: ResultList; open?: boolean; fontSize?: number | string }) {
  return (
    <>
      {props.list.map((item, index) => (
        <TreeNode
          active={item.active}
          fontSize={props.fontSize}
          key={index}
          open={props.open || item.hasActive}
          name={
            <Link className={'TreeNode__link'} to={`/categories/${kebabCase(item.name)}`}>
              {item.name}
            </Link>
          }
        >
          {item.children ? <Tree fontSize={props.fontSize} list={item.children} /> : ''}
        </TreeNode>
      ))}
    </>
  );
}

export default (props: PageProps) => {
  const { allCategories } = props.pathContext;

  const list = toList(allCategories || []);
  const spring = useSpring({
    delay: 100,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
  });

  if (allCategories) {
    return (
      <Layout showSideBar={false}>
        <Helmet title={`Categories | ${config.siteTitle}`} />
        <animated.div style={spring}>
          <Tree list={list} open={true} />
        </animated.div>
      </Layout>
    );
  }
  return '';
};
