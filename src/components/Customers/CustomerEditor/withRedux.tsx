import * as React from 'react';
import { connect } from 'react-redux';
import { fetchGroups, createCustomer } from 'redux/customerEditor/operations';
import {
  getGroups,
  getIsCreatingCustomer,
  getCreateCustomerFailed,
  getCreateCustomerErrorMessages
} from 'redux/customerEditor/selectors';
import { ICreateCustomer, IGroup } from 'interfaces/models';
import { IState } from 'redux/root';

interface IReduxProps {
  groups: IGroup[];
  isCreatingCustomer: boolean;
  createCustomerFailed: boolean;
  createCustomerErrorMessages: string[];
}

interface IDispatch {
  fetchGroups: () => void;
  handleSubmit: (customer: ICreateCustomer, callback: () => void) => void;
}

interface IOwnProps {
  handleClose: () => void;
}

export interface IWithReduxProps extends IReduxProps, IDispatch, IOwnProps {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerEditor extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.fetchGroups();
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchGroups: () => dispatch(fetchGroups()),
    handleSubmit: (customer: ICreateCustomer, callback: () => void) => dispatch(createCustomer(customer, callback))
  });

  const mapStateToProps = (state: IState) => ({
    groups: getGroups(state),
    isCreatingCustomer: getIsCreatingCustomer(state),
    createCustomerFailed: getCreateCustomerFailed(state),
    createCustomerErrorMessages: getCreateCustomerErrorMessages(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(CustomerEditor);
};

export { WithRedux };
