import React from 'react';
import arrayMove from 'array-move';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CustomerList } from 'components/Customers/CustomerList';
import { Pagination } from 'components/Customers/Pagination';
import { WithRedux, IWithReduxProps } from 'components/Customers/CustomerListContainer/withRedux';
import { ICustomer } from 'interfaces/models';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import MessageBox from 'utils/components/MessageBox';
import './styles.scss';

interface ICustomerListState {
  customers: ICustomer[];
}

interface IOnSortEnd {
  oldIndex: number;
  newIndex: number;
}

class CustomerListContainer extends React.Component<IWithReduxProps, ICustomerListState> {
  state = {
    customers: [] as ICustomer[]
  };

  componentDidUpdate(prevProps: IWithReduxProps) {
    if (this.props.customers !== prevProps.customers) {
      this.setState({ customers: this.props.customers });
    }
  }

  onSortEnd({ oldIndex, newIndex }: IOnSortEnd) {
    this.setState(({ customers }) => ({
      customers: arrayMove(customers, oldIndex, newIndex)
    }));
  }

  displayCustomerList() {
    const { isLoadingCustomers, failedToLoadCustomers } = this.props;
    const { customers } = this.state;
    if (isLoadingCustomers) {
      return <LoadingSpinner />;
    }

    if (failedToLoadCustomers) {
      return (
        <div className="customer-list-container-message-wrapper">
          <MessageBox
            message={<p>Due to an internal error, customers were not loaded. Please try again later.</p>}
            variant={'danger'}
          />
        </div>
      );
    }

    if (customers.length < 1) {
      return (
        <div className="customer-list-container-message-wrapper">
          <MessageBox
            message={
              <>
                <p>No customer found.</p>
                <a href="/#/customers">Reset the search condition</a>
              </>
            }
            variant={'info'}
          />
        </div>
      );
    }

    return (
      <CustomerList
        customers={customers}
        onSortEnd={({ oldIndex, newIndex }) => this.onSortEnd({ oldIndex, newIndex })}
        distance={1}
      />
    );
  }

  render() {
    return (
      <div className="customer-list-container">
        {this.displayCustomerList()}
        <Pagination />
      </div>
    );
  }
}

const CustomerListContainerConnected = WithRedux(CustomerListContainer);

export {
  CustomerListContainerConnected as CustomerListContainer,
  CustomerListContainer as DisconnectedCustomerListContainer
};
