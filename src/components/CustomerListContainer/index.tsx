import React from 'react';
import { Route } from 'react-router-dom';

export const CustomerListContainer = () => {
  return (
    <div>
      CustomerListContainer
      <div>
        <Route exact path="/customer-list/:id" component={() => <div>DETAILS</div>} />
      </div>
    </div>
  );
};
