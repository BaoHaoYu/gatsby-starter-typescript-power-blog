import { Col } from 'antd';
import { Meta } from '~/components/Meta/Meta';
import React from 'react';

export interface PostHeadProps {
  showToc: boolean;
  title: string;
  date: string;
  timeToRead: number;
  tags?: string[];
  categories?: string[];
  banner?: string;
}

export function PostHead(props: PostHeadProps) {
  return (
    <>
      {/*头部*/}
      <Col style={{ margin: 'auto' }} lg={props.showToc ? 24 : 20}>
        <h1 className={'h2'}>{props.title}</h1>
        <div style={{ marginBottom: `1.5rem` }}>
          <Meta
            tags={props.tags}
            categories={props.categories}
            date={props.date}
            timeToRead={props.timeToRead}
          />
        </div>
      </Col>
      {/*图片*/}
      {props.banner && (
        <div>
          <img className={'banner'} src={props.banner} alt={props.title} />
        </div>
      )}{' '}
    </>
  );
}
