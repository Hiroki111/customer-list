import React from 'react';
import arrayMove from 'array-move';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CustomerList } from 'components/Customers/CustomerList';
import { Pagination } from 'components/Customers/Pagination';
import { Hoc, IHocProps } from 'components/Customers/CustomerListContainer/hoc';
import { ICustomer } from 'redux/customerList/interfaces';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import MessageBox from 'utils/components/MessageBox';

interface ICustomerListState {
  customers: ICustomer[];
}

interface IOnSortEnd {
  oldIndex: number;
  newIndex: number;
}

class CustomerListContainer extends React.Component<IHocProps, ICustomerListState> {
  state = {
    customers: [] as ICustomer[]
  };

  componentDidUpdate(prevProps: IHocProps) {
    if (this.props.customers !== prevProps.customers) {
      this.setState({ customers: this.props.customers });
    }
  }

  onSortEnd({ oldIndex, newIndex }: IOnSortEnd) {
    this.setState(({ customers }) => ({
      customers: arrayMove(customers, oldIndex, newIndex)
    }));
  }

  render() {
    const { isLoadingCustomers, failedToLoadCustomers } = this.props;
    const { customers } = this.state;
    if (isLoadingCustomers) {
      return <LoadingSpinner />;
    }

    if (failedToLoadCustomers) {
      return <MessageBox message={'Due to an internal error, customers were not loaded. Please try again later.'} />;
    }

    return (
      <>
        <CustomerList
          customers={customers}
          onSortEnd={({ oldIndex, newIndex }) => this.onSortEnd({ oldIndex, newIndex })}
          distance={1}
        />
        <Pagination />
      </>
    );
  }
}

const CustomerListContainerConnected = Hoc(CustomerListContainer);

export { CustomerListContainerConnected as CustomerListContainer };