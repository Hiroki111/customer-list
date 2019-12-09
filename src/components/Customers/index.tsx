import React from 'react';
import { Route } from 'react-router-dom';

import { CustomerListContainer } from 'components/Customers/CustomerListContainer';

export const Customers = () => {
  return (
    <div>
      <Route exact path="/customers/:id" component={() => <div>DETAILS</div>} />
      <CustomerListContainer />
    </div>
  );
};
