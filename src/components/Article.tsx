import React from 'react';
import { Link } from 'gatsby';
import './Article.scss';
import { Meta, IMeta } from '~/components/Meta/Meta';

interface IProps extends IMeta {
  title: string;
  excerpt: string;
  slug: string;
  banner?: string;
  description?: string;
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
