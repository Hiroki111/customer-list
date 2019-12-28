import * as types from 'redux/customerEditor/types';
import { ICustomer } from 'interfaces/models';
import { IGroup } from 'interfaces/models';

interface IFetchCustomerResult {
  customer: ICustomer;
}

interface IFetchGroupsResult {
  groups: IGroup[];
}

export const fetchCustomer = () => {
  return {
    type: types.FETCH_CUSTOMER
  };
};

export const fetchCustomerFulfilled = (customer: IFetchCustomerResult) => {
  return {
    type: types.FETCH_CUSTOMER_FULFILLED,
    payload: customer
  };
};

export const fetchCustomerRejected = (error: boolean) => {
  return {
    type: types.FETCH_CUSTOMER_REJECTED,
    payload: error
  };
};

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

export const updateCustomer = () => {
  return {
    type: types.UPDATE_CUSTOMER
  };
};

export const updateCustomerFulfilled = (customer: IFetchCustomerResult) => {
  return {
    type: types.UPDATE_CUSTOMER_FULFILLED,
    payload: customer
  };
};

export const updateCustomerRejected = (errorMessages: string[]) => {
  return {
    type: types.UPDATE_CUSTOMER_REJECTED,
    payload: errorMessages
  };
};

export const resetCreatingCustomerStatus = () => {
  return {
    type: types.RESET_CREATE_CUSTOMER_STATUS
  };
};
