import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import LogErrors from './pages/LogErrors';

function App() {
  return (
    <Switch>
      <Route path="/logerrors" component={LogErrors} />
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default App;
