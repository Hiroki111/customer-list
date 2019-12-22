import * as types from 'redux/customerEditor/types';
import { IGroup } from 'interfaces/models';
import { AnyAction } from 'redux';

type status = 'OK' | 'PENDING' | 'FAILED' | '';

export interface ICustomerEditorState {
  groups: IGroup[];
  status: {
    fetchingGroups: status;
  };
}

export const defaults = {
  groups: [] as IGroup[],
  status: {
    fetchingGroups: '' as status
  }
};

export const customerEditorReducer = (state: ICustomerEditorState = defaults, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_GROUPS: {
      return {
        ...state,
        status: { ...state.status, fetchingGroups: 'PENDING' as status }
      };
    }

    case types.FETCH_GROUPS_FULFILLED: {
      return {
        ...state,
        groups: action.payload.groups,
        status: { ...state.status, fetchingGroups: 'OK' as status }
      };
    }

    case types.FETCH_GROUPS_REJECTED: {
      return {
        ...state,
        status: { ...state.status, fetchingGroups: 'FAILED' as status }
      };
    }
  }

  return state;
};
