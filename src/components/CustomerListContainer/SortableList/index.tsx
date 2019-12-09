import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import { CustomerListItem } from 'components/CustomerListContainer/CustomerListItem';
import { ICustomer } from 'redux/customerList/interfaces';

const SortableList = SortableContainer(({ customers }: { customers: ICustomer[] }) => {
  return (
    <ul className="customerslist-items">
      {customers.map((customer, i) => (
        <CustomerListItem key={i} index={i} name={customer.name} />
      ))}
    </ul>
  );
});

export { SortableList };
