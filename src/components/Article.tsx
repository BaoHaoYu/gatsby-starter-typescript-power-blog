import React from 'react';
import { Link } from 'gatsby';
import './Article.scss';
import { Meta, IMeta } from '~/components/Meta/Meta';
import { Row, Col } from 'antd';
import cn from 'classnames';
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
  const list = true;
  return (
    <div
      className={cn('Article', {
        'Article--list': list,
      })}
    >
      <Row gutter={list ? 30 : 0}>
        <Col span={list ? 8 : 24}>
          {banner && (
            <div className={'Article__banner'}>
              <img src={banner} alt={title} />
            </div>
          )}
        </Col>
        <Col span={list ? 16 : 24}>
          <h3 className={cn('Article__title', { h5: list })}>
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h3>
          <div className={'Article__meta'}>
            <Meta tags={tags} categories={categories} date={date} timeToRead={timeToRead} />
          </div>
          <p className={'Article__excerpt'}>{description || excerpt}</p>

          <Link className={'Article__read'} to={`/blog/${slug}`}>
            阅读
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export { Article };
