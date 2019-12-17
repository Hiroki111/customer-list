import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as qs from 'query-string';

import { fetchCustomers } from 'redux/customerList/operations';
import { ICustomer } from 'interfaces/models';
import { getCustomers, getIsLoadingCustomers, getFailedToLoadCustomers } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IReduxProps {
  customers: ICustomer[];
  isLoadingCustomers: boolean;
  failedToLoadCustomers: boolean;
}

interface IDispatch {
  fetchCustomers: (page: number) => void;
}

export interface IHocProps extends RouteComponentProps<{ page: string }>, IReduxProps, IDispatch {}

export const Hoc = (Component: React.ComponentType<IHocProps>) => {
  class CustomerList extends React.Component<IHocProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.updateCustomersFromUrl();
    }

    componentDidUpdate(prevProps: IHocProps) {
      if (this.props.location.search !== prevProps.location.search) {
        this.updateCustomersFromUrl();
      }
    }

    updateCustomersFromUrl() {
      const page = qs.parse(this.props.location.search).page || 1;
      this.props.fetchCustomers(Number(page));
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomers: (page: number) => dispatch(fetchCustomers(page))
  });

  const mapStateToProps = (state: IState) => ({
    customers: getCustomers(state),
    isLoadingCustomers: getIsLoadingCustomers(state),
    failedToLoadCustomers: getFailedToLoadCustomers(state)
  });

  const CustomerListWithRouter = withRouter(CustomerList);

  return connect(mapStateToProps, mapDispatchToProps)(CustomerListWithRouter);
};
