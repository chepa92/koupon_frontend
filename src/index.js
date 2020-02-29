import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/Router';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <ReactRouter/>
  </Router>,
  document.getElementById('root')
);
// registerServiceWorker();
