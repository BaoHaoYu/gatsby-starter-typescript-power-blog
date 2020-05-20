import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import './Article.scss';

interface IProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  timeToRead: number;
  banner?: string;
  description?: string;
  categories?: string[];
  tags?: string[];
}

function Meta(props: { date: string; timeToRead: number; tags?: string[]; categories?: string[] }) {
  function getSpan(name: string, list: string[], pageKey: string) {
    return (
      <span className={'Article__item'}>
        {name} :{' '}
        {list?.map((category, index) => (
          <>
            {index !== 0 ? ' , ' : ' '}
            <Link key={category} to={`/${pageKey}/${kebabCase(category)}`}>
              {category}
            </Link>
          </>
        ))}
      </span>
    );
  }

  return (
    <div className={'Article__meta'}>
      <span style={{ marginLeft: 0 }} className={'Article__item'}>
        日期 : {props.date}
      </span>
      <span className={'Article__item'}>长度: {props.timeToRead} 分钟</span>
      {props.tags && getSpan('标签', props.tags, 'tags')}
      {props.categories && getSpan('分类', props.categories, 'categories')}
    </div>
  );
}

const Article = ({
  title,
  date,
  excerpt,
  slug,
  timeToRead,
  banner,
  description,
  categories,
  tags,
}: IProps) => {
  return (
    <div className={'Article'}>
      {banner && (
        <div className={'Article__banner'}>
          <img src={banner} alt={title} />
        </div>
      )}
      <h3 className={'Article__title'}>
        <Link to={`/blog/${slug}`}>{title}</Link>
      </h3>
      <Meta tags={tags} categories={categories} date={date} timeToRead={timeToRead} />
      <p className={'Article__excerpt'}>{description || excerpt}</p>

      <Link className={'Article__read'} to={`/blog/${slug}`}>
        阅读
      </Link>
    </div>
  );
};

export { Article };
