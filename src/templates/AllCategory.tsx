import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { Layout, Wrapper, Header, SectionTitle, Content, Title } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import update from 'lodash/update';
import map from 'lodash/map';
import { Tree } from '~/components/Tree/Tree';

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
  return list.map((item, index) => (
    <Tree
      key={index}
      open={open}
      name={<Link to={`/categories/${kebabCase(item.name)}`}>{item.name}</Link>}
    >
      {item.children ? renderNode(item.children) : ''}
    </Tree>
  ));
}

export default (props: PageProps) => {
  const { categories, allCategories } = props.pathContext;
  console.log(toList(allCategories || []));

  const list = toList(allCategories || []);

  if (categories) {
    return (
      <Layout>
        <Helmet title={`Categories | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
          <SectionTitle>Categories</SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            {renderNode(list, true)}
          </Content>
        </Wrapper>
      </Layout>
    );
  }
};
