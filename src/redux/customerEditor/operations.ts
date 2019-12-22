import { Dispatch, AnyAction } from 'redux';
import * as actions from 'redux/customerEditor/actions';
import { apiBaseUrl } from 'config';
import axios from 'axios';

export const fetchGroups = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchGroups());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/groups`
      });
      const data = {
        groups: result.data.data
      };
      dispatch(actions.fetchGroupsFulfilled(data));
    } catch (error) {
      dispatch(actions.fetchGroupsRejected(error));
    }
  };
};
