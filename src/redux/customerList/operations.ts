import { Dispatch, AnyAction } from 'redux';
import * as actions from 'redux/customerList/actions';
import { apiBaseUrl, customerListPageSize } from 'config';
import axios from 'axios';

export const fetchCustomers = (page: number = 1) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchCustomers());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/customers?pageSize=${customerListPageSize}&page=${page}`
      });
      const data = {
        customers: result.data.data,
        totalCustomers: result.data.total,
        currentPage: result.data.current_page
      };
      dispatch(actions.fetchCustomersFulfilled(data));
    } catch (error) {
      dispatch(actions.fetchCustomersRejected(error));
    }
  };
};

export const fetchCustomersWithKeyword = (keyword: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchCustomers());
    try {
      const result = await axios({
        method: 'get',
        url: `${apiBaseUrl}/customers?pageSize=${customerListPageSize}&keyword=${keyword}`
      });
      const data = {
        customers: result.data.data,
        totalCustomers: result.data.total,
        currentPage: result.data.current_page
      };
      dispatch(actions.fetchCustomersFulfilled(data));
    } catch (error) {
      dispatch(actions.fetchCustomersRejected(error));
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
