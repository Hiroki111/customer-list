import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerDetailModal/withRedux';
import { getInitials } from 'utils';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import './styles.scss';

const CustomerDetailModal = ({
  handleClose,
  handleDelete,
  customer,
  isLoadingCustomer,
  loadingCustomerFailed,
  isDeletingCustomer,
  reloadCustomersList
}: IWithReduxProps) => {
  let history = useHistory();
  const displayBody = () => {
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
              <td className="field-name">address</td>
              <td className="data">{customer.address}</td>
            </tr>
            <tr>
              <td className="field-name">Group</td>
              <td className="data">{customer.group ? customer.group.name : ''}</td>
            </tr>
            <tr>
              <td className="field-name">Note</td>
              <td className="data">{customer.note}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };
  return (
    <Modal show={true} animation={false} onHide={handleClose} dialogClassName="customer-detail-modal">
      <div className="header">
        <p className="title">Customer Information</p>
        <button className="close" onClick={handleClose}>
          <span>x</span>
        </button>
      </div>
      <div className="body">{displayBody()}</div>
      <div className="footer">
        <button
          className="delete-button"
          onClick={() => {
            if (window.confirm('Do you really wish to delete this customer?')) {
              handleDelete(customer.id, () => {
                reloadCustomersList();
                history.push('/customers');
              });
            }
          }}
        >
          Delete
        </button>
        <button onClick={handleClose}>Back</button>
      </div>
    </Modal>
  );
};

const CustomerDetailModalWithRedux = WithRedux(CustomerDetailModal);

export { CustomerDetailModalWithRedux as CustomerDetailModal, CustomerDetailModal as DisconnectedCustomerDetailModal };
