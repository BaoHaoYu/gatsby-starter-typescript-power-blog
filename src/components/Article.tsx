import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import './Article.scss';

const Article = ({ title, date, excerpt, slug, timeToRead, category, banner }: Props) => {
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
          Data : {date}
        </span>
        <span className={'Article__item'}>{timeToRead} Min Read </span>
        <span className={'Article__item'}>
          Categories : <Link to={`/categories/${kebabCase(category)}`}> {category}</Link>
        </span>
      </div>
      <p className={'Article__excerpt'}>{excerpt}</p>

      <Link className={'Article__read'} to={`/blog/${slug}`}>
        Continue Reading
      </Link>
    </div>
  );
};

export { Article };
