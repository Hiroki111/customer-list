import * as React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, deleteCustomer } from 'redux/customerList/operations';
import { getIsDeletingCustomer } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IOwnProps {
  id: number;
  name: string;
  groupName: string;
}

interface IReduxProps {
  isDeletingCustomer: boolean;
}

interface IDispatch {
  handleDelete: (id: number, callback: () => void) => void;
  reloadCustomers: (page: number, keyword: string) => void;
}

export interface IWithReduxProps extends IOwnProps, IReduxProps, IDispatch {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerListItem extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    reloadCustomers: (page: number, keyword: string) => dispatch(fetchCustomers(page, keyword)),
    handleDelete: (id: number, callback: () => void) => dispatch(deleteCustomer(id, callback))
  });

  const mapStateToProps = (state: IState): IReduxProps => ({
    isDeletingCustomer: getIsDeletingCustomer(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(CustomerListItem);
};

export { WithRedux };
