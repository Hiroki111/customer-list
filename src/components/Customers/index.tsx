import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import { CustomerListContainer } from 'components/Customers/CustomerListContainer';
import { CustomerDetailModal } from 'components/Customers/CustomerDetailModal';

export const Customers = () => {
  let history = useHistory();
  return (
    <div>
      <Route
        exact
        path="/customers/:id"
        render={props => <CustomerDetailModal {...props} handleClose={() => history.push('/customers')} />}
      />
      <CustomerListContainer />
    </div>
  );
};
