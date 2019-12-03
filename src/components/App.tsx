import React from 'react';
import { Route, HashRouter as Router, Link } from 'react-router-dom';

import { CustomerListContainer } from 'components/CustomerListContainer';
import { About } from 'components/About';
import './styles.scss';

const App: React.FC = () => {
  return (
    <div id="container">
      <Router>
        <header>
          <nav>
            <Link id="title" to="/">
              Customer List
            </Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <Route exact path="/" component={CustomerListContainer} />
        <Route exact path="/about" component={About} />
      </Router>
    </div>
  );
};

export default App;
