import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const customerEditorSelector = (state: IState) => state.customerEditor;

export const getGroups = createSelector(customerEditorSelector, state =>
  state.groups.sort((a, b) => a.name.localeCompare(b.name))
);

export const getIsCreatingCustomer = createSelector(
  customerEditorSelector,
  state => state.status.creatingCustomer === 'PENDING'
);

export const getCreateCustomerFailed = createSelector(
  customerEditorSelector,
  state => state.status.creatingCustomer === 'FAILED'
);

export const getCreateCustomerErrorMessages = createSelector(
  customerEditorSelector,
  state => state.errorMessages.creatingCustomer
);
