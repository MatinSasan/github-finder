import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Spinner from './components/layout/Spinner';
import './App.css';

const Users = lazy(() => import('./components/users/Users'));
const Search = lazy(() => import('./components/users/Search'));
const About = lazy(() => import('./components/pages/About'));
const User = lazy(() => import('./components/users/User'));

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Alert />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' component={User} />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
