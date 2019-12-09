import React from 'react';
import arrayMove from 'array-move';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SortableList } from 'components/CustomerListContainer/SortableList';
import { Hoc, IHocProps } from 'components/CustomerListContainer/CustomerList/hoc';
import { ICustomer } from 'redux/customerList/interfaces';
import LoadingSpinner from 'utils/LoadingSpinner';
import MessageBox from 'utils/MessageBox';

interface ICustomerListState {
  customers: ICustomer[];
}

interface IOnSortEnd {
  oldIndex: number;
  newIndex: number;
}

class CustomerList extends React.Component<IHocProps, ICustomerListState> {
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
      <SortableList
        customers={customers}
        onSortEnd={({ oldIndex, newIndex }) => this.onSortEnd({ oldIndex, newIndex })}
        distance={1}
      />
    );
  }
}

const CustomerListConnected = Hoc(CustomerList);

export { CustomerListConnected as CustomerList };
