import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import { CustomerListItem } from 'components/Customers/CustomerListItem';
import { ICustomer } from 'interfaces/models';
import './styles.scss';

const CustomerList = SortableContainer(({ customers }: { customers: ICustomer[] }) => {
  return (
    <ul className="customerlist">
      {customers.map((customer, i) => (
        <CustomerListItem
          key={i}
          index={i}
          id={customer.id}
          name={customer.name}
          groupName={customer.group ? customer.group.name : 'N/A'}
        />
      ))}
    </ul>
  );
});

export { CustomerList };
