import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import LogErrors from './pages/LogErrors';
import LogErrorDetails from './pages/LogErrorDetails';

function App() {
  return (
    <Switch>
      <Route path="/logerrors/:id" component={LogErrorDetails} />
      <Route path="/logerrors" component={LogErrors} />
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default App;
