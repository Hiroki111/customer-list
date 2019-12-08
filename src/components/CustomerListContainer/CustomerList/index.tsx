import React from 'react';
import { Hoc, IHocProps } from 'components/CustomerListContainer/CustomerList/hoc';

const CustomerList = ({ customers }: IHocProps) => {
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
