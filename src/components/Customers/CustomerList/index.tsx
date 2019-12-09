import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import { CustomerListItem } from 'components/Customers/CustomerListItem';
import { ICustomer } from 'redux/customerList/interfaces';

const CustomerList = SortableContainer(({ customers }: { customers: ICustomer[] }) => {
  return (
    <ul className="customerslist-items">
      {customers.map((customer, i) => (
        <CustomerListItem key={i} index={i} name={customer.name} />
      ))}
    </ul>
  );
});

export { CustomerList };
