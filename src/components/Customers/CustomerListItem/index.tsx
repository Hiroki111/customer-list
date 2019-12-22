import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { SortableElement } from 'react-sortable-hoc';
import InitialIcon from 'utils/components/InitialIcon';
import './styles.scss';

interface ICustomerListItem {
  id: number;
  name: string;
  groupName: string;
}

const CustomerListItem = ({ id, name, groupName }: ICustomerListItem) => {
  return (
    <li className="customerlistitem">
      <Link to={{ pathname: `/customers/${id}`, state: { goBack: true } }}>
        <div className="customerlistitem-names">
          <div className="customer-name">{name}</div>
          <div className="group-name">
            <FontAwesomeIcon icon={faBuilding} />
            <span>{groupName}</span>
          </div>
        </div>
        <InitialIcon name={name} />
      </Link>
    </li>
  );
};

const SortableCustomerListItem = SortableElement(CustomerListItem);

export { SortableCustomerListItem as CustomerListItem };
