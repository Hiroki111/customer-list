import { Dispatch, AnyAction } from 'redux';
import * as _ from 'lodash';
import * as actions from 'redux/customerEditor/actions';
import { ICreateCustomer } from 'interfaces/models';
import { apiBaseUrl } from 'config';
import axios from 'axios';

export const fetchCustomer = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchCustomer());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/customers/${id}`,
      });

      dispatch(actions.fetchCustomerFulfilled({ customer: result.data.data }));
    } catch (error) {
      alert('Internal error occurred. Please try again later.');
      dispatch(actions.fetchCustomerRejected(error));
    }
  };
};

export const fetchGroups = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchGroups());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/groups`,
      });
      dispatch(actions.fetchGroupsFulfilled({ groups: result.data.data }));
    } catch (error) {
      dispatch(actions.fetchGroupsRejected());
    }
  };
};

export const saveCustomer = (customer: ICreateCustomer, callback: () => void) => {
  if (customer.id < 0) {
    return createCustomer(customer, callback);
  } else {
    return updateCustomer(customer, callback);
  }
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
          Accept: 'application/json',
        },
      });
      dispatch(actions.createCustomerFulfilled());
      callback();
    } catch (error) {
      let messages;
      if (_.has(error, 'response.data.messages')) {
        messages = Object.keys(error.response.data.messages).map((key) =>
          error.response.data.messages[key].join(',  ')
        );
      } else {
        messages = [error.message];
      }
      dispatch(actions.createCustomerRejected(messages));
    }
  };
};

export const updateCustomer = (customer: ICreateCustomer, callback: () => void) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.updateCustomer());
    try {
      const result = await axios({
        method: 'put',
        url: `${apiBaseUrl}/customers/${customer.id}`,
        data: customer,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      dispatch(
        actions.updateCustomerFulfilled({
          customer: result.data.data,
        })
      );
      callback();
    } catch (error) {
      let messages;
      if (_.has(error, 'response.data.messages')) {
        messages = Object.keys(error.response.data.messages).map((key) =>
          error.response.data.messages[key].join(',  ')
        );
      } else {
        messages = [error.message];
      }
      dispatch(actions.updateCustomerRejected(messages));
    }
  };
};
