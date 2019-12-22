import React from 'react';
import { useHistory } from 'react-router-dom';

import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerDetail/withRedux';
import { getInitials } from 'utils';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import './styles.scss';

const CustomerDetail = ({
  handleClose,
  handleDelete,
  customer,
  isLoadingCustomer,
  loadingCustomerFailed,
  isDeletingCustomer,
  reloadCustomersList
}: IWithReduxProps) => {
  const history = useHistory();
  const onClickDelete = () => {
    if (!window.confirm('Do you really wish to delete this customer?')) {
      return;
    }

    handleDelete(customer.id, () => {
      reloadCustomersList();
      history.push('/customers');
    });
  };

  if (loadingCustomerFailed) {
    return <div>Loading the person details failed.</div>;
  }

  if (isLoadingCustomer || isDeletingCustomer) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="icon" data-letters={getInitials(customer.name)}></div>
      <p className="name">{customer.name}</p>
      <p className="phone">{customer.phone}</p>
      <hr />
      <table className="customer-details-table">
        <tbody>
          <tr>
            <td className="field-name">Email</td>
            <td className="data">{customer.email}</td>
          </tr>
          <tr>
            <td className="field-name">Address</td>
            <td className="data">{customer.address}</td>
          </tr>
          <tr>
            <td className="field-name">Group</td>
            <td className="data">{customer.group ? customer.group.name : 'N/A'}</td>
          </tr>
          <tr>
            <td className="field-name">Note</td>
            <td className="data">{customer.note}</td>
          </tr>
        </tbody>
      </table>
      <div className="footer">
        <button className="delete-button" onClick={onClickDelete}>
          Delete
        </button>
        <button onClick={handleClose}>Back</button>
      </div>
    </>
  );
};

const CustomerDetailWithRedux = WithRedux(CustomerDetail);

export { CustomerDetailWithRedux as CustomerDetail, CustomerDetail as DisconnectedCustomerDetail };
