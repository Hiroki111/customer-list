import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoadingSpinner from 'utils/components/LoadingSpinner';
import './styles.scss';

interface ICustomerModal {
  handleClose: () => void;
  title: string;
  showLoadingSpinner: boolean;
  children: JSX.Element[] | JSX.Element;
}

const CustomerModal = ({ title, showLoadingSpinner, children, handleClose }: ICustomerModal) => {
  return (
    <Modal show animation={false} onHide={handleClose} dialogClassName="customer-modal">
      <div className="header">
        <p className="title">{title}</p>
        <button className="close" onClick={handleClose}>
          <span>x</span>
        </button>
      </div>
      <div className="body">{showLoadingSpinner ? <LoadingSpinner /> : children}</div>
    </Modal>
  );
};

export { CustomerModal };
