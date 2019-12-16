import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const customerDetailSelector = (state: IState) => state.customerDetail;

export const getCustomer = createSelector(customerDetailSelector, state => state.customer);

export const getIsLoadingCustomer = createSelector(
  customerDetailSelector,
  state => state.status.fetchingCustomer === 'PENDING'
);

export const getLoadingCustomerFailed = createSelector(
  customerDetailSelector,
  state => state.status.fetchingCustomer === 'FAILED'
);

export const getIsDeletingCustomer = createSelector(
  customerDetailSelector,
  state => state.status.deletingCustomer === 'PENDING'
);
