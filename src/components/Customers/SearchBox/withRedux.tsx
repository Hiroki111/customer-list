import * as React from 'react';
import { connect } from 'react-redux';
import { getIsLoadingCustomers } from 'redux/customerList/selectors';
import { IState } from 'redux/root';

interface IReduxProps {
  isLoadingCustomers: boolean;
}

export interface IWithReduxProps extends IReduxProps {}

export const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class SearchBox extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: IState) => ({
    isLoadingCustomers: getIsLoadingCustomers(state)
  });

  return connect(mapStateToProps, {})(SearchBox);
};
