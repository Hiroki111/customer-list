import React from 'react';
import { Route, HashRouter as Router, Redirect } from 'react-router-dom';

import { Customers } from 'components/Customers';
import { About } from 'components/About';
import { Header } from 'components/Header';

const App: React.FC = () => {
  return (
    <div id="container">
      <Router>
        <Header />
        <Route exact path="/" render={() => <Redirect to="/customers" />} />
        <Route path="/customers" component={Customers} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
};

export default App;
