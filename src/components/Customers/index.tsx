import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

import { CustomerListContainer } from 'components/Customers/CustomerListContainer';
import { CustomerDetail } from 'components/Customers/CustomerDetail';
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
      <Route exact path="/customers/:id" render={props => <CustomerDetail {...props} handleClose={handleClose} />} />
      <div className="action-bar">
        <div className="actions">
          <Link to="/customers/-1">Create New Customer</Link>
          <SearchBox />
        </div>
      </div>
      <CustomerListContainer />
    </>
  );
};
