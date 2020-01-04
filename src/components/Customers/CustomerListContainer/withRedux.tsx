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
  fetchCustomers: (page: number, keyword: string) => void;
}

export interface IWithReduxProps extends RouteComponentProps<{ page: string }>, IReduxProps, IDispatch {}

export const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerList extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.fetchCustomers(this.getPageNuber(), this.getKeyword());
    }

    componentDidUpdate(prevProps: IWithReduxProps) {
      if (
        this.props.location.search !== prevProps.location.search && // page number and search keyword
        this.props.location.pathname === prevProps.location.pathname
      ) {
        this.props.fetchCustomers(this.getPageNuber(), this.getKeyword());
      }
    }

    getPageNuber(): number {
      const page = qs.parse(this.props.location.search).page || '1';
      return Number(page);
    }

    getKeyword(): string {
      const keyword = qs.parse(this.props.location.search).keyword || '';
      if (keyword instanceof Array) {
        return keyword[0];
      } else {
        return keyword;
      }
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchCustomers: (page: number, keyword: string) => dispatch(fetchCustomers(page, keyword))
  });

  const mapStateToProps = (state: IState) => ({
    customers: getCustomers(state),
    isLoadingCustomers: getIsLoadingCustomers(state),
    failedToLoadCustomers: getFailedToLoadCustomers(state)
  });

  const CustomerListWithRouter = withRouter(CustomerList);

  return connect(mapStateToProps, mapDispatchToProps)(CustomerListWithRouter);
};
