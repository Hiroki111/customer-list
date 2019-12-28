import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { fetchCustomer, fetchGroups, createCustomer, updateCustomer } from 'redux/customerEditor/operations';
import { resetCreatingCustomerStatus } from 'redux/customerEditor/actions';
import {
  getCustomer,
  getGroups,
  getIsCreatingCustomer,
  getIsUpdatingCustomer,
  getIsLoadingCurrentCustomer,
  getFailedToLoadCurrentCustomer,
  getCustomerIsCreated,
  getCustomerIsUpdated,
  getFailedToCreateCustomer,
  getFailedToUpdateCustomer,
  getCustomerCreationErrorMessages,
  getCustomerUpdateErrorMessages
} from 'redux/customerEditor/selectors';
import { ICustomer, ICreateCustomer, IGroup } from 'interfaces/models';
import { IState } from 'redux/root';

interface IOwnProps extends RouteComponentProps<{ id: string }> {
  handleClose: () => void;
}

interface IReduxProps {
  currentCustomerData: ICustomer;
  groups: IGroup[];
  isCreatingCustomer: boolean;
  isUpdatingCustomer: boolean;
  isLoadingCurrentCustomer: boolean;
  failedToLoadCurrentCustomer: boolean;
  customerIsCreated: boolean;
  customerIsUpdated: boolean;
  failedToCreateCustomer: boolean;
  failedToUpdateCustomer: boolean;
  customerCreationErrorMessages: string[];
  customerUpdateErrorMessages: string[];
}

interface IDispatch {
  fetchCustomer: (id: number) => void;
  fetchGroups: () => void;
  resetCreatingCustomerStatus: () => void;
  handleSubmit: (customer: ICreateCustomer, callback: () => void) => void;
}

export interface IWithReduxProps extends IReduxProps, IDispatch, IOwnProps {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerEditor extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.fetchGroups();
      this.props.resetCreatingCustomerStatus();
      let id;
      const idString = this.props.match.params.id;
      if (idString.includes('?')) {
        id = Number(idString.substr(0, idString.indexOf('?')));
      } else {
        id = Number(idString);
      }
      this.props.fetchCustomer(id);
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomer: (id: number) => dispatch(fetchCustomer(id)),
    fetchGroups: () => dispatch(fetchGroups()),
    resetCreatingCustomerStatus: () => dispatch(resetCreatingCustomerStatus()),
    handleSubmit: (customer: ICreateCustomer, callback: () => void) => {
      if (customer.id > 0) {
        dispatch(updateCustomer(customer, callback));
      } else {
        dispatch(createCustomer(customer, callback));
      }
    }
  });

  const mapStateToProps = (state: IState) => ({
    currentCustomerData: getCustomer(state),
    groups: getGroups(state),
    isCreatingCustomer: getIsCreatingCustomer(state),
    isUpdatingCustomer: getIsUpdatingCustomer(state),
    isLoadingCurrentCustomer: getIsLoadingCurrentCustomer(state),
    failedToLoadCurrentCustomer: getFailedToLoadCurrentCustomer(state),
    customerIsCreated: getCustomerIsCreated(state),
    customerIsUpdated: getCustomerIsUpdated(state),
    failedToCreateCustomer: getFailedToCreateCustomer(state),
    failedToUpdateCustomer: getFailedToUpdateCustomer(state),
    customerCreationErrorMessages: getCustomerCreationErrorMessages(state),
    customerUpdateErrorMessages: getCustomerUpdateErrorMessages(state)
  });

  const CustomerEditorWithRedux = connect(mapStateToProps, mapDispatchToProps)(CustomerEditor);

  return withRouter(CustomerEditorWithRedux);
};

export { WithRedux };
