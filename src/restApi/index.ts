import axios from 'axios';

import { apiBaseUrl, customerListPageSize } from 'config';
import { ICreateCustomer } from 'interfaces/models';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  fetchGroups: async (): Promise<{ data: any }> => {
    return await axios({
      method: 'GET',
      url: `${apiBaseUrl}/groups`,
    });
  },

  fetchCustomer: async (id: number): Promise<{ data: any }> => {
    return await axios({
      method: 'GET',
      url: `${apiBaseUrl}/customers/${id}`,
    });
  },

  createCustomer: async (customer: ICreateCustomer): Promise<void> => {
    await axios({
      method: 'POST',
      url: `${apiBaseUrl}/customers`,
      data: customer,
      headers: defaultHeaders,
    });
  },

  updateCustomer: async (customer: ICreateCustomer): Promise<{ data: any }> => {
    return await axios({
      method: 'PUT',
      url: `${apiBaseUrl}/customers/${customer.id}`,
      data: customer,
      headers: defaultHeaders,
    });
  },

  deleteCustomer: async (id: number): Promise<void> => {
    await axios({
      method: 'DELETE',
      url: `${apiBaseUrl}/customers/${id}`,
      headers: defaultHeaders,
    });
  },

  fetchCustomers: async (page: number, keyword: string): Promise<{ data: any }> => {
    return await axios({
      method: 'GET',
      url: `${apiBaseUrl}/customers?pageSize=${customerListPageSize}&page=${page}&keyword=${keyword}`,
    });
  },
};

export default restApi;
