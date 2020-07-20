import React from 'react';
import { Helmet } from 'react-helmet';

export default props => {
  return (
  <>
    <Helmet>
      <title>Turbo Todo</title>
      <meta name="description" content="Todos!" />
      <meta name="theme-color" content="#008f68" />
    </Helmet>
    <h1>Hello {props.name}!</h1>
  </>);
};