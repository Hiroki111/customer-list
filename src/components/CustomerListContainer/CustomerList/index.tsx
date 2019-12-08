import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Hoc, IHocProps } from 'components/CustomerListContainer/CustomerList/hoc';
import LoadingSpinner from 'utils/LoadingSpinner';
import MessageBox from 'utils/MessageBox';

const CustomerList = ({ customers, isLoadingCustomers, failedToLoadCustomers }: IHocProps) => {
  if (isLoadingCustomers) {
    return <LoadingSpinner />;
  }

  if (failedToLoadCustomers) {
    return <MessageBox message={'Due to an internal error, customers were not loaded. Please try again later.'} />;
  }

  return (
    <ul className="customerslist-items">
      {customers.map((customer, i) => (
        <li key={i}>{customer.name}</li>
      ))}
    </ul>
  );
};

const CustomerListConnected = Hoc(CustomerList);

export { CustomerListConnected as CustomerList };
