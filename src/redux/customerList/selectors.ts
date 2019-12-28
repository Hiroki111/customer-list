import { createSelector } from 'reselect';
import { IState } from 'redux/root';

import { customerListPageSize } from 'config';

const customerListSelector = (state: IState) => state.customerList;

export const getCustomers = createSelector(customerListSelector, state => state.customers);

export const getIsLoadingCustomers = createSelector(
  customerListSelector,
  state => state.status.fetchingCustomers === 'PENDING'
);

export const getFailedToLoadCustomers = createSelector(
  customerListSelector,
  state => state.status.fetchingCustomers === 'FAILED'
);

export const getTotalPage = createSelector(customerListSelector, state => {
  if (state.totalCustomers % Number(customerListPageSize) === 0) {
    return state.totalCustomers / Number(customerListPageSize);
  }

  return ~~(state.totalCustomers / Number(customerListPageSize)) + 1;
});

export const getCurrentPage = createSelector(customerListSelector, state => state.currentPage);

export const getIsDeletingCustomer = createSelector(
  customerListSelector,
  state => state.status.deletingCustomer === 'PENDING'
);
