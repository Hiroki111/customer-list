import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageBox from 'utils/components/MessageBox';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import './styles.scss';

interface ICustomerModal {
  handleClose: () => void;
  title: string;
  showLoadingSpinner: boolean;
  showWarning: boolean;
  children: JSX.Element[] | JSX.Element;
}

const CustomerModal = ({ title, showLoadingSpinner, showWarning, children, handleClose }: ICustomerModal) => {
  const displayBody = () => {
    if (showLoadingSpinner) {
      return <LoadingSpinner />;
    } else if (showWarning) {
      return <MessageBox message={<p>ERROR : Please try again later.</p>} variant={'danger'} />;
    } else {
      return children;
    }
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

export { CustomerModal };
