import * as React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers } from 'redux/customerList/operations';
import { getTotalPage, getCurrentPage, getIsLoadingCustomers } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IReduxProps {
  totalPage: number;
  currentPage: number;
  isLoadingCustomers: boolean;
}

interface IDispatch {
  fetchCustomers: (page: number) => void;
}

export interface IWithReduxProps extends IReduxProps, IDispatch {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class Pagination extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomers: (page: number) => dispatch(fetchCustomers(page))
  });

  const mapStateToProps = (state: IState) => ({
    totalPage: getTotalPage(state),
    currentPage: getCurrentPage(state),
    isLoadingCustomers: getIsLoadingCustomers(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(Pagination);
};

export { WithRedux };
