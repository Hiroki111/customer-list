import * as types from 'redux/customerList/types';
import { ICustomer } from 'redux/customerList/interfaces';

interface IFetchCustomersResult {
  customers: ICustomer[];
  totalCustomers: number;
  currentPage: number;
}

export const fetchCustomers = () => {
  return {
    type: types.FETCH_CUSTOMERS
  };
};

export const fetchCustomersFulfilled = (payload: IFetchCustomersResult) => {
  return {
    type: types.FETCH_CUSTOMERS_FULFILLED,
    payload: payload
  };
};

export const fetchCustomersRejected = (error: boolean) => {
  return {
    type: types.FETCH_CUSTOMERS_REJECTED,
    payload: error
  };
};
