import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { fetchCustomer, fetchGroups, saveCustomer } from 'redux/customerEditor/operations';
import { fetchCustomers } from 'redux/customerList/operations';
import { resetCreatingCustomerStatus } from 'redux/customerEditor/actions';
import * as selectors from 'redux/customerEditor/selectors';
import { ICustomer, ICreateCustomer, IGroup } from 'interfaces/models';
import { IState } from 'redux/root';

interface IOwnProps extends RouteComponentProps<{ id: string }> {
  handleClose: () => void;
}

interface IReduxProps {
  currentCustomerData: ICustomer;
  groups: IGroup[];
  isSavingCustomer: boolean;
  isLoadingCurrentCustomer: boolean;
  failedToLoadCurrentCustomer: boolean;
  customerIsSaved: boolean;
  failedToSaveCustomer: boolean;
  errorMessages: string[];
}

interface IDispatch {
  fetchCustomer: (id: number) => void;
  fetchGroups: () => void;
  resetCreatingCustomerStatus: () => void;
  handleSubmit: (customer: ICreateCustomer, callback: () => void) => void;
  reloadCustomers: (page: number, keyword: string) => void;
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
      this.props.fetchCustomer(Number(this.props.match.params.id));
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomer: (id: number) => dispatch(fetchCustomer(id)),
    fetchGroups: () => dispatch(fetchGroups()),
    resetCreatingCustomerStatus: () => dispatch(resetCreatingCustomerStatus()),
    handleSubmit: (customer: ICreateCustomer, callback: () => void) => dispatch(saveCustomer(customer, callback)),
    reloadCustomers: (page: number, keyword: string) => dispatch(fetchCustomers(page, keyword)),
  });

  const mapStateToProps = (state: IState) => ({
    currentCustomerData: selectors.getCustomer(state),
    groups: selectors.getGroups(state),
    isSavingCustomer: selectors.getIsSavingCustomer(state),
    isLoadingCurrentCustomer: selectors.getIsLoadingCurrentCustomer(state),
    failedToLoadCurrentCustomer: selectors.getFailedToLoadCurrentCustomer(state),
    customerIsSaved: selectors.getCustomerIsSaved(state),
    failedToSaveCustomer: selectors.getFailedToSaveCustomer(state),
    errorMessages: selectors.getErrorMessages(state),
  });

  const CustomerEditorWithRedux = connect(mapStateToProps, mapDispatchToProps)(CustomerEditor);

  return withRouter(CustomerEditorWithRedux);
};

export { WithRedux };
