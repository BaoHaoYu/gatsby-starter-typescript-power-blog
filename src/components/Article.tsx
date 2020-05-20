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
  category: string;
  banner?: string;
}

const Article = ({ title, date, excerpt, slug, timeToRead, category, banner }: IProps) => {
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
      <div className={'Article__meta'}>
        <span style={{ marginLeft: 0 }} className={'Article__item'}>
          日期 : {date}
        </span>
        <span className={'Article__item'}>长度: {timeToRead} 分钟</span>
        <span className={'Article__item'}>
          分类 : <Link to={`/categories/${kebabCase(category)}`}> {category}</Link>
        </span>
      </div>
      <p className={'Article__excerpt'}>{excerpt}</p>

      <Link className={'Article__read'} to={`/blog/${slug}`}>
        阅读
      </Link>
    </div>
  );
};

export { Article };
