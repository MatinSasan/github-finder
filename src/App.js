import React, {
  useState,
  Fragment,
  lazy,
  Suspense,
  useEffect,
  useContext
} from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import GithubContext from './context/github/githubContext';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Spinner from './components/layout/Spinner';
import './App.css';

const Users = lazy(() => import('./components/users/Users'));
const Search = lazy(() => import('./components/users/Search'));
const About = lazy(() => import('./components/pages/About'));
const User = lazy(() => import('./components/users/User'));

const App = () => {
  // const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const githubContext = useContext(GithubContext);

  // async function fetchApi() {
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   setUsers(res.data);
  //   setLoading(false);
  // }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    githubContext.setUsers();
  }, []);

  const getUserRepos = async login => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort-created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
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
                  <Search setAlert={showAlert} />
                  <Users />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User {...props} getUserRepos={getUserRepos} repos={repos} />
              )}
            />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
