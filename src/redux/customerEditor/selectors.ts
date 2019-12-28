import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const customerEditorSelector = (state: IState) => state.customerEditor;

export const getCustomer = createSelector(customerEditorSelector, state => state.customer);

export const getGroups = createSelector(customerEditorSelector, state =>
  state.groups.sort((a, b) => a.name.localeCompare(b.name))
);

export const getIsCreatingCustomer = createSelector(
  customerEditorSelector,
  state => state.status.creatingCustomer === 'PENDING'
);

export const getIsLoadingCurrentCustomer = createSelector(
  customerEditorSelector,
  state => state.status.fetchingCustomer === 'PENDING'
);

export const getIsUpdatingCustomer = createSelector(
  customerEditorSelector,
  state => state.status.updatingCustomer === 'PENDING'
);

export const getCustomerIsCreated = createSelector(
  customerEditorSelector,
  state => state.status.creatingCustomer === 'OK'
);

export const getCustomerIsUpdated = createSelector(
  customerEditorSelector,
  state => state.status.updatingCustomer === 'OK'
);

export const getFailedToCreateCustomer = createSelector(
  customerEditorSelector,
  state => state.status.creatingCustomer === 'FAILED'
);

export const getFailedToLoadCurrentCustomer = createSelector(
  customerEditorSelector,
  state => state.status.fetchingCustomer === 'FAILED'
);

export const getFailedToUpdateCustomer = createSelector(
  customerEditorSelector,
  state => state.status.updatingCustomer === 'FAILED'
);

export const getCustomerCreationErrorMessages = createSelector(
  customerEditorSelector,
  state => state.errorMessages.creatingCustomer
);

export const getCustomerUpdateErrorMessages = createSelector(
  customerEditorSelector,
  state => state.errorMessages.updatingCustomer
);
