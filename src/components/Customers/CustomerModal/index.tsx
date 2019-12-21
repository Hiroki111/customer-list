import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CustomerEditor } from 'components/Customers/CustomerEditor';
import { CustomerDetail } from 'components/Customers/CustomerDetail';
import './styles.scss';

interface ICustomerModal extends RouteComponentProps<{ id: string }> {
  handleClose: () => void;
}

const CustomerModal = ({ match, handleClose }: ICustomerModal) => {
  const id = Number(match.params.id);
  const title = id < 1 ? 'Create Customer' : 'Customer Information';
  const displayBody = () => {
    return id < 1 ? <CustomerEditor /> : <CustomerDetail id={id} handleClose={handleClose} />;
  };

  return (
    <Modal show animation={false} onHide={handleClose} dialogClassName="customer-modal">
      <div className="header">
        <p className="title">{title}</p>
        <button className="close" onClick={handleClose}>
          <span>x</span>
        </button>
      </div>
      <div className="body">{displayBody()}</div>
    </Modal>
  );
};

const CustomerModalWithRouter = withRouter(CustomerModal);

export { CustomerModalWithRouter as CustomerModal };
