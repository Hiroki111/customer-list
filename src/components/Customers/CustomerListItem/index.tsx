import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { SortableElement } from 'react-sortable-hoc';
import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerListItem/withRedux';
import InitialIcon from 'utils/components/InitialIcon';
import { getSearchConditions } from 'utils/index';
import './styles.scss';

const CustomerListItem = ({ id, name, groupName, handleDelete, reloadCustomers }: IWithReduxProps) => {
  const history = useHistory();
  const queryParameter = _.get(history, 'location.search', '');
  const pathName = `/customers/edit/${id}${queryParameter}`;
  const onClickDelete = () => {
    if (!window.confirm('Do you really wish to delete this customer?')) {
      return;
    }

    handleDelete(id, () => {
      const { page, keyword } = getSearchConditions(history);
      reloadCustomers(page, keyword);
    });
  };

  return (
    <li className="customerlistitem">
      <Link to={pathName}>
        <InitialIcon name={name} />
        <div className="names">
          <div className="customer-name">{name}</div>
          <div className="group-name">
            <FontAwesomeIcon icon={faBuilding} />
            <span>{groupName}</span>
          </div>
        </div>
      </Link>
      <div className="customerlistitem-icon">
        <button onClick={onClickDelete}>DELETE</button>
      </div>
    </li>
  );
};

const CustomerListItemWithRedux = WithRedux(CustomerListItem);
const SortableCustomerListItemWithRedux = SortableElement(CustomerListItemWithRedux);

export { SortableCustomerListItemWithRedux as CustomerListItem };
