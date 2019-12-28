import { AnyAction } from 'redux';
import * as types from 'redux/customerDetail/types';
import { ICustomer } from 'interfaces/models';
import { Status } from 'redux/types';

export interface ICustomerDetailState {
  customer: ICustomer;
  status: {
    fetchingCustomer: Status;
    deletingCustomer: Status;
  };
}

export const defaults = {
  customer: {} as ICustomer,
  status: {
    fetchingCustomer: '' as Status,
    deletingCustomer: '' as Status
  }
};

export const customerDetailReducer = (state: ICustomerDetailState = defaults, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_CUSTOMER: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomer: 'PENDING' as Status }
      };
    }

    case types.FETCH_CUSTOMER_FULFILLED: {
      return {
        ...state,
        customer: action.payload.customer,
        status: { ...state.status, fetchingCustomer: 'OK' as Status }
      };
    }

    case types.FETCH_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomer: 'FAILED' as Status }
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
