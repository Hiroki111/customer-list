import * as React from 'react';
import { connect } from 'react-redux';

import { fetchCustomers } from 'redux/customerList/operations';
import { ICustomer } from 'redux/customerList/interfaces';
import { getCustomers, getIsLoadingCustomers, getFailedToLoadCustomers } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IReduxProps {
  customers: ICustomer[];
  isLoadingCustomers: boolean;
  failedToLoadCustomers: boolean;
}

interface IDispatch {
  fetchCustomers: () => void;
}

export interface IHocProps extends IReduxProps, IDispatch {}

export const Hoc = (Component: React.ComponentType<IHocProps>) => {
  class CustomerList extends React.Component<IHocProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.fetchCustomers();
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomers: () => dispatch(fetchCustomers())
  });

  const mapStateToProps = (state: IState) => ({
    customers: getCustomers(state),
    isLoadingCustomers: getIsLoadingCustomers(state),
    failedToLoadCustomers: getFailedToLoadCustomers(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(CustomerList);
};
