import * as React from 'react';
import { connect } from 'react-redux';
import { fetchCustomersWithKeyword, fetchCustomers } from 'redux/customerList/operations';
import { getIsLoadingCustomers } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IReduxProps {
  isLoadingCustomers: boolean;
}

interface IDispatch {
  handleSubmit: (keyword: string) => void;
  handleReset: () => void;
}

export interface IWithReduxProps extends IReduxProps, IDispatch {}

export const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class SearchBox extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    handleSubmit: (keyword: string) => dispatch(fetchCustomersWithKeyword(keyword)),
    handleReset: () => dispatch(fetchCustomers())
  });

  const mapStateToProps = (state: IState) => ({
    isLoadingCustomers: getIsLoadingCustomers(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(SearchBox);
};
