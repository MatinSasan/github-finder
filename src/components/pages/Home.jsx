import React, { Fragment, lazy } from 'react';

const Users = lazy(() => import('../users/Users'));
const Search = lazy(() => import('../users/Search'));

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
