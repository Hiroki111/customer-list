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

export const fetchGroupsRejected = (error: boolean) => {
  return {
    type: types.FETCH_GROUPS_REJECTED,
    payload: error
  };
};
