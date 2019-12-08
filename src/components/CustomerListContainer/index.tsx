import React from 'react';
import { Route } from 'react-router-dom';

import { CustomerList } from 'components/CustomerListContainer/CustomerList';

export const CustomerListContainer = () => {
  return (
    <div>
      <Route exact path="/customer-list/:id" component={() => <div>DETAILS</div>} />
      <CustomerList />
    </div>
  );
};
