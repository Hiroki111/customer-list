import * as React from 'react';
import { defaultCustomer } from 'redux/customerEditor/reducer';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DisconnectedCustomerEditor } from '../index';
import { IGroup } from 'interfaces/models';
import MessageBox from 'utils/components/MessageBox';

configure({ adapter: new Adapter() });

const baseMatch: match<{ id: string }> = {
  isExact: true,
  path: '/customers/edit/:id',
  url: '/customers/edit/-1',
  params: { id: '-1' }
};

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

jest.spyOn(React, 'useEffect').mockImplementation(fn => fn());

describe('CustomerEditor', () => {
  const baseProps = {
    currentCustomerData: defaultCustomer,
    groups: [{ id: 1, name: 'Sample 1' }] as IGroup[],
    isSavingCustomer: false,
    isLoadingCurrentCustomer: false,
    failedToLoadCurrentCustomer: false,
    customerIsSaved: false,
    failedToSaveCustomer: false,
    errorMessages: [],
    handleClose: jest.fn(),
    fetchCustomer: jest.fn(),
    fetchGroups: jest.fn(),
    resetCreatingCustomerStatus: jest.fn(),
    handleSubmit: jest.fn(),
    reloadCustomers: jest.fn(),
    history: createMemoryHistory(),
    location: createLocation(baseMatch.url),
    match: baseMatch
  };

  it('renders the success message when a customer is created', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({ customerIsSaved: true });
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
    ).toEqual('New customer created.');
  });

  it('renders the success message when a customer is updated', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({ customerIsSaved: true, currentCustomerData: { ...defaultCustomer, id: '1' } });
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
    ).toEqual('Customer Updated.');
  });

  it('renders the error messages when submission failed', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({ failedToSaveCustomer: true, errorMessages: ['name'] });
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
        .includes('ERROR :')
    ).toEqual(true);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
        .includes('name')
    ).toEqual(true);
  });

  it('allows the user to enter values to input boxes and submit them', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.find('#name').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('#phone').simulate('change', { target: { value: '000 111 222' } });
    wrapper.find('#email').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('#address').simulate('change', { target: { value: 'Blue St 123' } });
    wrapper.find('#note').simulate('change', { target: { value: 'This is for testing' } });

    wrapper.find('form').simulate('submit', { preventDefault() {} });
    wrapper.update();

    const inputValues = {
      ...baseProps.currentCustomerData,
      name: 'John Doe',
      phone: '000 111 222',
      email: 'test@example.com',
      address: 'Blue St 123',
      note: 'This is for testing'
    };
    expect(baseProps.handleSubmit).toHaveBeenCalledWith(inputValues, expect.anything());
  });
});
