import { Dispatch, AnyAction } from 'redux';
import * as actions from 'redux/customerDetail/actions';
import { apiBaseUrl } from 'config';
import axios from 'axios';

export const fetchCustomer = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchCustomer());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/customers/${id}`
      });

      dispatch(
        actions.fetchCustomerFulfilled({
          customer: result.data.data
        })
      );
    } catch (error) {
      alert('Internal error occurred. Please try again later.');
      dispatch(actions.fetchCustomerRejected(error));
    }
  };
};

export const deleteCustomer = (id: number, callback: () => void) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.deleteCustomer());
    try {
      await axios({
        method: 'delete',
        url: `${apiBaseUrl}/customers/${id}`,
        headers: {
          Accept: 'application/json'
        }
      });
      dispatch(actions.deleteCustomerFulfilled());
      callback();
    } catch (error) {
      alert('Internal error occurred. Please try again later.');
      dispatch(actions.deleteCustomerRejected());
    }
  };
};
