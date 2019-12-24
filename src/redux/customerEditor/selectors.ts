import { createSelector } from 'reselect';
import { IState } from 'redux/root';

const customerEditorSelector = (state: IState) => state.customerEditor;

export const getGroups = createSelector(customerEditorSelector, state =>
  state.groups.sort((a, b) => a.name.localeCompare(b.name))
);
