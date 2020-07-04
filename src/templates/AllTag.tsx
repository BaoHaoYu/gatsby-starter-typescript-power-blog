import React from 'react';

import PageProps from '../models/PageProps';

export default (props: PageProps) => {
  const { tags } = props.pathContext;
  if (tags) {
    return <div />;
  }
};
