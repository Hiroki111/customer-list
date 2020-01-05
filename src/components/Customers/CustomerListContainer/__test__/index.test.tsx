import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { DisconnectedCustomerListContainer } from '../index';
import { CustomerList } from 'components/Customers/CustomerList';
import LoadingSpinner from 'utils/components/LoadingSpinner';
import MessageBox from 'utils/components/MessageBox';
import { defaultCustomer } from 'redux/customerEditor/reducer';
import { ICustomer } from 'interfaces/models';

configure({ adapter: new Adapter() });

const baseMatch: match<{ page: string }> = {
  isExact: true,
  path: '/customers',
  url: '/customers',
  params: { page: '1' }
};

jest.spyOn(React, 'useEffect').mockImplementation(fn => fn());

describe('CustomerListContainer', () => {
  const baseProps = {
    customers: [] as ICustomer[],
    isLoadingCustomers: false,
    failedToLoadCustomers: false,
    fetchCustomers: jest.fn(),
    history: createMemoryHistory(),
    location: createLocation(baseMatch.url),
    match: baseMatch
  };

  it("renders LoadingSpinner while it's loading customers", () => {
    const wrapper = shallow(<DisconnectedCustomerListContainer {...baseProps} />);
    wrapper.setProps({ isLoadingCustomers: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(1);
    expect(wrapper.find(MessageBox).length).toEqual(0);
    expect(wrapper.find(CustomerList).length).toEqual(0);
  });

  it('renders MessageBox while it failed to load customers', () => {
    const wrapper = shallow(<DisconnectedCustomerListContainer {...baseProps} />);
    wrapper.setProps({ failedToLoadCustomers: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(wrapper.find(CustomerList).length).toEqual(0);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
    ).toEqual('Due to an internal error, customers were not loaded. Please try again later.');
  });

  it('renders MessageBox while the number loaded customers is 0', () => {
    const wrapper = shallow(<DisconnectedCustomerListContainer {...baseProps} />);
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(wrapper.find(CustomerList).length).toEqual(0);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
    ).toEqual('No customer found.Reset the search condition');
  });

  it('renders CustomerList if there is at least one customer', () => {
    const wrapper = shallow(<DisconnectedCustomerListContainer {...baseProps} />);
    wrapper.setProps({ customers: [defaultCustomer] });
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(MessageBox).length).toEqual(0);
    expect(wrapper.find(CustomerList).length).toEqual(1);
  });
});
