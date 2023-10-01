import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/pages/Login';
import Products from './components/products/Products';
import NavBar from './components/NavBar/NavBar';
const App = () => {


  return (
    <Router>
    <NavBar/>
    <Switch>
      <Route path="/products"><Products /></Route>
      <Route path="/login" exact><Login /></Route>

    </Switch>
  </Router>
  );
};

export default App;
