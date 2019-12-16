import React from 'react';
import { Link } from 'react-router-dom';
import { SortableElement } from 'react-sortable-hoc';

const CustomerListItem = ({ name, id }: { name: string; id: number }) => {
  return (
    <li>
      <Link to={`/customers/${id}`}>{name}</Link>
    </li>
  );
};

const SortableCustomerListItem = SortableElement(CustomerListItem);

export { SortableCustomerListItem as CustomerListItem };
