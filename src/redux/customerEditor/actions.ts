import * as types from 'redux/customerEditor/types';
import { IGroup } from 'interfaces/models';

interface IFetchGroupsResult {
  groups: IGroup[];
}

export const fetchGroups = () => {
  return {
    type: types.FETCH_GROUPS
  };
};

export const fetchGroupsFulfilled = (payload: IFetchGroupsResult) => {
  return {
    type: types.FETCH_GROUPS_FULFILLED,
    payload: payload
  };
};

export const fetchGroupsRejected = () => {
  return {
    type: types.FETCH_GROUPS_REJECTED
  };
};

export const createCustomer = () => {
  return {
    type: types.CREATE_CUSTOMER
  };
};

export const createCustomerFulfilled = () => {
  return {
    type: types.CREATE_CUSTOMER_FULFILLED
  };
};

export const createCustomerRejected = (errorMessages: string[]) => {
  return {
    type: types.CREATE_CUSTOMER_REJECTED,
    payload: errorMessages
  };
};
