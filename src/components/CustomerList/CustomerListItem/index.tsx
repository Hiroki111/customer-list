import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const CustomerListItem = ({ name }: { name: string }) => {
  return <li>{name}</li>;
};

const SortableCustomerListItem = SortableElement(CustomerListItem);

export { SortableCustomerListItem as CustomerListItem };
