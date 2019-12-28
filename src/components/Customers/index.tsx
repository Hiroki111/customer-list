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
  const queryParameter = _.get(history, 'location.search', '');
  const pathName = `/customers/edit/-1${queryParameter}`;

  const handleClose = () => {
    const goBack = _.get(history, 'location.state.goBack', false);
    if (goBack) {
      history.goBack();
    } else {
      history.push(`/customers${queryParameter}`);
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
          <Link to={pathName}>Create New Customer</Link>
          <SearchBox />
        </div>
      </div>
      <CustomerListContainer />
    </>
  );
};
