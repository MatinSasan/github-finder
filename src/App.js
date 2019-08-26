import React, { useState, Fragment, lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Spinner from './components/layout/Spinner';
import './App.css';

const Users = lazy(() => import('./components/users/Users'));
const Search = lazy(() => import('./components/users/Search'));
const About = lazy(() => import('./components/pages/About'));
const User = lazy(() => import('./components/users/User'));

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function fetchApi() {
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchApi();
  }, []);

  const searchUsers = async text => {
    if (text === '') {
      return;
    }

    this.setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async login => {
    this.setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async login => {
    this.setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort-created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUser([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <Alert alert={alert} />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
