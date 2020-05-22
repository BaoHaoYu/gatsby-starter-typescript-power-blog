import IPost from '~/models/Post';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import React from 'react';
import './NavPreAndNext.scss';

export function NavPreAndNext(props: { prev?: IPost; next?: IPost }) {
  return (
    <div className={'navPost'}>
      <Row>
        {props.prev && (
          <Col span={12}>
            <div className={'navPost__item'}>
              <span className={'navPost__label'}>prev blog : </span>
              <Link className={'navPost__link'} to={'/blog/' + props.prev.fields.slug}>
                {props.prev.frontmatter.title}
              </Link>
            </div>
          </Col>
        )}

        {props.next && (
          <Col span={12}>
            <div className={'navPost__item navPost__item--next'}>
              <span className={'navPost__label'}>prev blog : </span>
              <Link className={'navPost__link'} to={'/blog/' + props.next.fields.slug}>
                {props.next.frontmatter.title}
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
