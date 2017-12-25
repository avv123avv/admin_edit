import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import App from 'components/App';
import Table from 'components/Table';
import Login from 'components/Login';

export default (
  <Route component={App} path='/'>
    <IndexRoute component={Table} />
    <Route path='/login' component={Login}/>
    <Route path='/table' component={Table}/>
  </Route>
);
