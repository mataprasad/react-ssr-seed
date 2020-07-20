import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import About from './About';

export default props => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>

      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home name="App Test Neo" {...props} />}
        />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
};