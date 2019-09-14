import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router';

render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();
