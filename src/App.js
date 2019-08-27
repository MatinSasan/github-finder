import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Spinner from './components/layout/Spinner';
import './App.css';

const About = lazy(() => import('./components/pages/About'));
const User = lazy(() => import('./components/users/User'));
const Home = lazy(() => import('./components/pages/Home'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Alert />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' component={User} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
