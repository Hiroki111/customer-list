import { Dispatch, AnyAction } from 'redux';

import * as actions from 'redux/customerList/actions';
import restApi from 'restApi';

export const fetchCustomers = (page: number = 1, keyword: string = '') => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.fetchCustomers());
    try {
      const result = await restApi.fetchCustomers(page, keyword);
      const data = {
        customers: result.data.data,
        totalCustomers: result.data.total,
        currentPage: result.data.current_page,
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
      await restApi.deleteCustomer(id);
      dispatch(actions.deleteCustomerFulfilled());
      callback();
    } catch (error) {
      alert('Internal error occurred. Please try again later.');
      dispatch(actions.deleteCustomerRejected());
    }
  };
};
