import * as types from 'redux/customerDetail/types';
import { ICustomer } from 'interfaces/models';

interface IFetchCustomerResult {
  customer: ICustomer;
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

export const deleteCustomer = () => {
  return {
    type: types.DELETE_CUSTOMER
  };
};

export const deleteCustomerFulfilled = () => {
  return {
    type: types.DELETE_CUSTOMER_FULFILLED
  };
};

export const deleteCustomerRejected = () => {
  return {
    type: types.DELETE_CUSTOMER_REJECTED
  };
};
