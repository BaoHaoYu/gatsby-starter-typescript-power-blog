import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { Layout } from '../components/Layout/index';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import update from 'lodash/update';
import map from 'lodash/map';
import { Tree } from '~/components/Tree/Tree';
import { useSpring, animated } from 'react-spring';

type ResultObject = { [K: string]: boolean | ResultObject };
type ResultList = { name: string; children?: ResultList }[];

function toList(allCategories: [string][]): ResultList {
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

    map(_result, (value: boolean | ResultObject, key) => {
      if (typeof value === 'boolean') {
        resultList.push({
          name: key,
        });
      } else if (typeof value === 'object') {
        resultList.push({
          name: key,
          children: deepToList(value),
        });
      }
    });

    return resultList;
  }
  return deepToList(result);
}

function renderNode(list: ResultList, open?: boolean) {
  return (
    <>
      {list.map((item, index) => (
        <Tree
          key={index}
          open={open}
          name={
            <Link className={'TreeNode__link'} to={`/categories/${kebabCase(item.name)}`}>
              {item.name}
            </Link>
          }
        >
          {item.children ? renderNode(item.children) : ''}
        </Tree>
      ))}
    </>
  );
}

export default (props: PageProps) => {
  const { categories, allCategories } = props.pathContext;

  const list = toList(allCategories || []);
  const spring = useSpring({
    delay: 100,
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(60px)' },
  });

  if (categories) {
    return (
      <Layout showSideBar={false}>
        <Helmet title={`Categories | ${config.siteTitle}`} />
        <animated.div style={spring}>{renderNode(list, true)}</animated.div>
      </Layout>
    );
  }
};
