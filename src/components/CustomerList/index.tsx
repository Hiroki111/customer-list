import React from 'react';
import { Route } from 'react-router-dom';

import { CustomerListContainer } from 'components/CustomerList/CustomerListContainer';

export const CustomerList = () => {
  return (
    <div>
      <Route exact path="/customer-list/:id" component={() => <div>DETAILS</div>} />
      <CustomerListContainer />
    </div>
  );
};
