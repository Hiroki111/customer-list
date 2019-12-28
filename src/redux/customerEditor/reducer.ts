import { AnyAction } from 'redux';
import * as types from 'redux/customerEditor/types';
import { ICustomer } from 'interfaces/models';
import { IGroup } from 'interfaces/models';
import { Status } from 'redux/types';

export const defaultCustomer = {
  id: -1,
  name: '',
  phone: '',
  email: '',
  address: '',
  note: '',
  group_id: 0
};

export interface ICustomerEditorState {
  customer: ICustomer;
  groups: IGroup[];
  status: {
    fetchingCustomer: Status;
    fetchingGroups: Status;
    creatingCustomer: Status;
    updatingCustomer: Status;
  };
  errorMessages: {
    creatingCustomer: any[];
    updatingCustomer: any[];
  };
}

export const defaults = {
  customer: defaultCustomer,
  groups: [] as IGroup[],
  status: {
    fetchingCustomer: '' as Status,
    fetchingGroups: '' as Status,
    creatingCustomer: '' as Status,
    updatingCustomer: '' as Status
  },
  errorMessages: {
    creatingCustomer: [] as any[],
    updatingCustomer: [] as any[]
  }
};

export const customerEditorReducer = (state: ICustomerEditorState = defaults, action: AnyAction) => {
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
        customer: action.payload.customer || defaultCustomer,
        status: { ...state.status, fetchingCustomer: 'OK' as Status }
      };
    }

    case types.FETCH_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingCustomer: 'FAILED' as Status }
      };
    }

    case types.FETCH_GROUPS: {
      return {
        ...state,
        status: { ...state.status, fetchingGroups: 'PENDING' as Status }
      };
    }

    case types.FETCH_GROUPS_FULFILLED: {
      return {
        ...state,
        groups: action.payload.groups,
        status: { ...state.status, fetchingGroups: 'OK' as Status }
      };
    }

    case types.FETCH_GROUPS_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingGroups: 'FAILED' as Status }
      };
    }

    case types.CREATE_CUSTOMER: {
      return {
        ...state,
        status: { ...state.status, creatingCustomer: 'PENDING' as Status },
        errorMessages: { ...state.errorMessages, creatingCustomer: [] }
      };
    }

    case types.CREATE_CUSTOMER_FULFILLED: {
      return {
        ...state,
        status: { ...state.status, creatingCustomer: 'OK' as Status }
      };
    }

    case types.CREATE_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: { ...state.status, creatingCustomer: 'FAILED' as Status },
        errorMessages: { ...state.errorMessages, creatingCustomer: action.payload }
      };
    }

    case types.UPDATE_CUSTOMER: {
      return {
        ...state,
        status: { ...state.status, updatingCustomer: 'PENDING' as Status },
        errorMessages: { ...state.errorMessages, updatingCustomer: [] }
      };
    }

    case types.UPDATE_CUSTOMER_FULFILLED: {
      return {
        ...state,
        customer: action.payload.customer,
        status: { ...state.status, updatingCustomer: 'OK' as Status }
      };
    }

    case types.UPDATE_CUSTOMER_REJECTED: {
      return {
        ...state,
        status: { ...state.status, updatingCustomer: 'FAILED' as Status },
        errorMessages: { ...state.errorMessages, updatingCustomer: action.payload }
      };
    }

    case types.RESET_CREATE_CUSTOMER_STATUS: {
      return {
        ...state,
        status: { ...state.status, creatingCustomer: '' as Status, updatingCustomer: '' as Status },
        errorMessages: { creatingCustomer: [], updatingCustomer: [] }
      };
    }
  }

  return state;
};
