import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const customerEditorSelector = (state: IState) => state.customerEditor;

export const getCustomer = createSelector(customerEditorSelector, state => state.customer);

export const getGroups = createSelector(customerEditorSelector, state =>
  state.groups.sort((a, b) => a.name.localeCompare(b.name))
);

export const getIsSavingCustomer = createSelector(customerEditorSelector, state => {
  if (state.customer.id < 1) {
    return state.status.creatingCustomer === 'PENDING';
  } else {
    return state.status.updatingCustomer === 'PENDING';
  }
});

export const getCustomerIsSaved = createSelector(customerEditorSelector, state => {
  if (state.customer.id < 1) {
    return state.status.creatingCustomer === 'OK';
  } else {
    return state.status.updatingCustomer === 'OK';
  }
});

export const getFailedToSaveCustomer = createSelector(customerEditorSelector, state => {
  if (state.customer.id < 1) {
    return state.status.creatingCustomer === 'FAILED';
  } else {
    return state.status.updatingCustomer === 'FAILED';
  }
});

export const getErrorMessages = createSelector(customerEditorSelector, state => {
  if (state.customer.id < 1) {
    return state.errorMessages.creatingCustomer;
  } else {
    return state.errorMessages.updatingCustomer;
  }
});

export const getIsLoadingCurrentCustomer = createSelector(
  customerEditorSelector,
  state => state.status.fetchingCustomer === 'PENDING'
);

export const getFailedToLoadCurrentCustomer = createSelector(
  customerEditorSelector,
  state => state.status.fetchingCustomer === 'FAILED'
);
