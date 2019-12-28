import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

import { CustomerListContainer } from 'components/Customers/CustomerListContainer';
import { CustomerEditor } from 'components/Customers/CustomerEditor';
import { SearchBox } from 'components/Customers/SearchBox';
import './styles.scss';

export const Customers = () => {
  let history = useHistory();

  const handleClose = () => {
    const goBack = _.get(history, 'location.state.goBack', false);
    if (goBack) {
      history.goBack();
    } else {
      history.push('/customers');
    }
  };

  return (
    <>
      <Route
        exact
        path="/customers/edit/:id"
        render={props => <CustomerEditor {...props} handleClose={handleClose} />}
      />
      <div className="action-bar">
        <div className="actions">
          <Link to="/customers/edit/-1">Create New Customer</Link>
          <SearchBox />
        </div>
      </div>
      <CustomerListContainer />
    </>
  );
};
