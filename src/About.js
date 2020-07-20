import React from 'react';
import { Helmet } from 'react-helmet';

export default props => {
  return (
  <>
    <Helmet>
      <title>About mATA</title>
    </Helmet>
    <h1>Hello on About Page {props.name}!</h1>
  </>
  );
};