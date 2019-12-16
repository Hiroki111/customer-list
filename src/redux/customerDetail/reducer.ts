import * as types from 'redux/customerDetail/types';
import { ICustomer } from 'interfaces/models';
import { AnyAction } from 'redux';

type status = 'OK' | 'PENDING' | 'FAILED' | '';

export interface ICustomerDetailState {
  customer: ICustomer;
  status: {
    fetchingCustomer: status;
    deletingCustomer: status;
  };
}

export const defaults = {
  customer: {} as ICustomer,
  status: {
    fetchingCustomer: '' as status,
    deletingCustomer: '' as status
  }
};

export const customerDetailReducer = (state: ICustomerDetailState = defaults, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_CUSTOMER: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomer: 'PENDING' as status }
      };
    }

    case types.FETCH_CUSTOMER_FULFILLED: {
      return {
        ...state,
        customer: action.payload.customer,
        status: { ...state.status, fetchingCustomer: 'OK' as status }
      };
    }

    case types.FETCH_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomer: 'FAILED' as status }
      };
    }

    case types.DELETE_CUSTOMER: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'PENDING' as status
        }
      };
    }

    case types.DELETE_CUSTOMER_FULFILLED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'OK' as status
        }
      };
    }

    case types.DELETE_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          deletingCustomer: 'FAILED' as status
        }
      };
    }
  }

  return state;
};
