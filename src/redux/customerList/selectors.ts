import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const personsSelector = (state: IState) => state.customerList;

export const getCustomers = createSelector(personsSelector, state => state.customers);

export const getIsLoadingCustomers = createSelector(
  personsSelector,
  state => state.status.fetchingCustomers === 'PENDING'
);

export const getFailedToLoadCustomers = createSelector(
  personsSelector,
  state => state.status.fetchingCustomers === 'FAILED'
);
