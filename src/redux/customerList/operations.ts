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
