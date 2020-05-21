import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React from 'react';
import './Meta.scss';

export interface IMeta {
  date: string;
  timeToRead: number;
  tags?: string[];
  categories?: string[];
}
export function Meta(props: IMeta) {
  function getSpan(name: string, list: string[], pageKey: string) {
    return (
      <span className={'Meta__item'}>
        {name} :{' '}
        {list?.map((category, index) => (
          <span key={category}>
            {index !== 0 ? ' , ' : ' '}
            <Link to={`/${pageKey}/${kebabCase(category)}`}>{category}</Link>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className={'Meta'}>
      <span style={{ marginLeft: 0 }} className={'Meta__item'}>
        日期 : {props.date}
      </span>
      <span className={'Meta__item'}>长度: {props.timeToRead} 分钟</span>
      {props.tags && getSpan('标签', props.tags, 'tags')}
      {props.categories && getSpan('分类', props.categories, 'categories')}
    </div>
  );
}
