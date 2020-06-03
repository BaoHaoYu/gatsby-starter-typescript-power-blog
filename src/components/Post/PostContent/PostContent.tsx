import React from 'react';
import IPost from '~/models/Post';
import cn from 'classnames';
import { PostNavPreAndNext } from '~/components/Post/PostNavPreAndNext/PostNavPreAndNext';

interface PostContentProps {
  showToc: boolean;
  post: React.MutableRefObject<null>;
  html: string;
  exceedMd: boolean;
  next?: IPost;
  prev?: IPost;
}

export function PostContent(props: PostContentProps) {
  return (
    <div
      className={cn('content', {
        'content--showToc': props.showToc,
      })}
    >
      <div
        id={'postContent'}
        ref={props.post}
        dangerouslySetInnerHTML={{ __html: props.html || '' }}
      />

      {props.exceedMd && <PostNavPreAndNext next={props.next} prev={props.prev} />}
    </div>
  );
}
