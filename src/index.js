import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import App from './App';

ReactDOM.render(
  <GithubState>
    <Router>
      <App />
    </Router>
  </GithubState>,
  document.getElementById('root')
);
