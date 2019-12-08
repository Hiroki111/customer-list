import * as types from 'redux/customerList/types';
import { ICustomer } from 'redux/customerList/interfaces';
import { AnyAction } from 'redux';

type status = 'OK' | 'PENDING' | 'FAILED' | '';

export interface ICustomerListState {
  customers: ICustomer[];
  totalCustomers: number;
  currentPage: number;
  status: {
    fetchingCustomers: status;
  };
}

export const defaults = {
  customers: [] as ICustomer[],
  totalCustomers: 0,
  currentPage: 0,
  status: {
    fetchingCustomers: '' as status
  }
};

export const customerListReducer = (state: ICustomerListState = defaults, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomers: 'PENDING' as status }
      };
    }

    case types.FETCH_CUSTOMERS_FULFILLED: {
      return {
        ...state,
        customers: action.payload.customers,
        totalCustomers: action.payload.totalCustomers,
        currentPage: action.payload.currentPage,
        status: { ...state.status, fetchingCustomers: 'OK' as status }
      };
    }

    case types.FETCH_CUSTOMERS_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomers: 'FAILED' as status }
      };
    }
  }

  return state;
};
