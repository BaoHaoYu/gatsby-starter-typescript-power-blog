import React from 'react';
import { Link } from 'gatsby';
import './Article.scss';
import { Meta, IMeta } from '~/components/Meta/Meta';
import { Row, Col } from 'antd';
import cn from 'classnames';
import { useLessXs } from '~/utils/media';
interface IProps extends IMeta {
  title: string;
  excerpt: string;
  slug: string;
  banner?: string;
  description?: string;
  layout?: 'full' | 'list' | 'left-list' | 'right-list';
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
  layout,
}: IProps) => {
  const lessXs = useLessXs();
  const isList = layout === 'list' || layout === 'left-list' || layout === 'right-list';

  return (
    <div
      className={cn('Article', {
        'Article--list': isList,
      })}
    >
      <Row gutter={isList && !lessXs ? 30 : 0}>
        <Col xs={24} md={isList ? 8 : 24}>
          {banner && (
            <div
              style={{ marginBottom: lessXs ? '0.5rem' : '1.5rem' }}
              className={'Article__banner'}
            >
              <img src={banner} alt={title} />
            </div>
          )}
        </Col>
        <Col xs={24} md={isList ? 16 : 24}>
          <h3 className={cn('Article__title', { h5: lessXs })}>
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h3>
          <div className={'Article__meta'} style={{ marginBottom: lessXs ? '0.5rem' : '1.5rem' }}>
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
