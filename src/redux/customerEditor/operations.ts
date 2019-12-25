import { Dispatch, AnyAction } from 'redux';
import * as actions from 'redux/customerEditor/actions';
import { ICreateCustomer } from 'interfaces/models';
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
      dispatch(actions.fetchGroupsFulfilled({ groups: result.data.data }));
    } catch (error) {
      dispatch(actions.fetchGroupsRejected());
    }
  };
};

export const createCustomer = (customer: ICreateCustomer, callback: () => void) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.createCustomer());
    try {
      await axios({
        method: 'post',
        url: `${apiBaseUrl}/customers`,
        data: customer,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      dispatch(actions.createCustomerFulfilled());
      callback();
    } catch (error) {
      let messages;
      if (error.response.data.messages) {
        messages = Object.keys(error.response.data.messages).map(function(key) {
          return error.response.data.messages[key].join(',  ');
        });
      } else {
        messages = [error.message];
      }

      dispatch(actions.createCustomerRejected(messages));
    }
  };
};
