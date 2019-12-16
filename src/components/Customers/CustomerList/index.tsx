import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import { CustomerListItem } from 'components/Customers/CustomerListItem';
import { ICustomer } from 'interfaces/models';

const CustomerList = SortableContainer(({ customers }: { customers: ICustomer[] }) => {
  return (
    <ul className="customerslist-items">
      {customers.map((customer, i) => (
        <CustomerListItem key={i} index={i} name={customer.name} id={customer.id} />
      ))}
    </ul>
  );
});

export { CustomerList };
