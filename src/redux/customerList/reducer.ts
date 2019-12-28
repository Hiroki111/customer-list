import { AnyAction } from 'redux';
import * as types from 'redux/customerList/types';
import { ICustomer } from 'interfaces/models';
import { Status } from 'redux/types';

export interface ICustomerListState {
  customers: ICustomer[];
  totalCustomers: number;
  currentPage: number;
  status: {
    fetchingCustomers: Status;
    deletingCustomer: Status;
  };
}

export const defaults = {
  customers: [] as ICustomer[],
  totalCustomers: 0,
  currentPage: 0,
  status: {
    fetchingCustomers: '' as Status,
    deletingCustomer: '' as Status
  }
};

export const customerListReducer = (state: ICustomerListState = defaults, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomers: 'PENDING' as Status }
      };
    }

    case types.FETCH_CUSTOMERS_FULFILLED: {
      return {
        ...state,
        customers: action.payload.customers,
        totalCustomers: action.payload.totalCustomers,
        currentPage: action.payload.currentPage,
        status: { ...state.status, fetchingCustomers: 'OK' as Status }
      };
    }

    case types.FETCH_CUSTOMERS_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomers: 'FAILED' as Status }
      };
    }

    case types.DELETE_CUSTOMER: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'PENDING' as Status
        }
      };
    }

    case types.DELETE_CUSTOMER_FULFILLED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'OK' as Status
        }
      };
    }

    case types.DELETE_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'FAILED' as Status
        }
      };
    }
  }

  return state;
};
