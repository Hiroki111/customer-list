import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { fetchCustomers } from 'redux/customerList/operations';
import { deleteCustomer, fetchCustomer } from 'redux/customerDetail/operations';
import { ICustomer } from 'interfaces/models';
import {
  getCustomer,
  getIsLoadingCustomer,
  getLoadingCustomerFailed,
  getIsDeletingCustomer
} from 'redux/customerDetail/selectors';
import { IState } from 'redux/root';

interface IOwnProps extends RouteComponentProps<{ id: string }> {
  handleClose: () => void;
}

interface IReduxProps {
  customer: ICustomer;
  isLoadingCustomer: boolean;
  loadingCustomerFailed: boolean;
  isDeletingCustomer: boolean;
}

interface IDispatch {
  fetchCustomer: (id: number) => void;
  handleDelete: (id: number, callback: () => void) => void;
  reloadCustomersList: () => void;
}

export interface IWithReduxProps extends IOwnProps, IReduxProps, IDispatch {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerDetail extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      const id = Number(this.props.match.params.id);
      if (id > 0) {
        this.props.fetchCustomer(id);
      }
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomer: (id: number) => dispatch(fetchCustomer(id)),
    reloadCustomersList: () => dispatch(fetchCustomers()),
    handleDelete: (id: number, callback: () => void) => dispatch(deleteCustomer(id, callback))
  });

  const mapStateToProps = (state: IState): IReduxProps => ({
    customer: getCustomer(state),
    isLoadingCustomer: getIsLoadingCustomer(state),
    loadingCustomerFailed: getLoadingCustomerFailed(state),
    isDeletingCustomer: getIsDeletingCustomer(state)
  });

  const CustomerDetailWithRouter = withRouter(CustomerDetail);

  return connect(mapStateToProps, mapDispatchToProps)(CustomerDetailWithRouter);
};

export { WithRedux };
