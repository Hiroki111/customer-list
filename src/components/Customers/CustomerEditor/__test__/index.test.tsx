import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DisconnectedCustomerEditor } from '../index';
import { ICustomer, ICreateCustomer, IGroup } from 'interfaces/models';

configure({ adapter: new Adapter() });

describe('CustomerEditor', () => {
  const baseProps = {
    id: '',
    handleClose: jest.fn(),
    currentCustomerData: {} as ICustomer,
    groups: [] as IGroup[],
    isCreatingCustomer: false,
    isUpdatingCustomer: false,
    isLoadingCurrentCustomer: false,
    failedToLoadCurrentCustomer: false,
    customerIsCreated: false,
    customerIsUpdated: false,
    failedToCreateCustomer: false,
    failedToUpdateCustomer: false,
    customerCreationErrorMessages: [],
    customerUpdateErrorMessages: [],
    fetchCustomer: jest.fn(),
    fetchGroups: jest.fn(),
    resetCreatingCustomerStatus: jest.fn(),
    handleSubmit: jest.fn(),
    reloadCustomers: jest.fn()
  };

  it('renders the loading animation when fetching organizations', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor.WrappedComponent {...baseProps} />);
    wrapper.setProps({ isFetchingOrganizations: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(1);
    expect(wrapper.find(NotificationModal).length).toEqual(0);
    expect(wrapper.find(FieldContainer).length).toEqual(0);
  });

  it('renders the notification nodal when submission was successful', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({ submitSuccess: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(NotificationModal).length).toEqual(1);
    expect(wrapper.find(FieldContainer).length).toEqual(0);
  });

  it('renders the fields when organizations are fetched and submission status is not successful', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(NotificationModal).length).toEqual(0);
    expect(wrapper.find(FieldContainer).length).toEqual(1);
  });

  it('diables the submit button when it is fetching organizations', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({
      isFetchingOrganizations: true,
      hasEmptyMandatoryField: false,
      isSubmittingPersonEditor: false
    });
    expect(wrapper.find('.submit-person-button').prop('disabled')).toEqual(true);
  });

  it('diables the submit button when there is an empty mandatory field', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({
      isFetchingOrganizations: false,
      hasEmptyMandatoryField: true,
      isSubmittingPersonEditor: false
    });
    expect(wrapper.find('.submit-person-button').prop('disabled')).toEqual(true);
  });

  it('diables the submit button when it is submitting person data', () => {
    const wrapper = shallow(<DisconnectedCustomerEditor {...baseProps} />);
    wrapper.setProps({
      isFetchingOrganizations: false,
      hasEmptyMandatoryField: false,
      isSubmittingPersonEditor: true
    });
    expect(wrapper.find('.submit-person-button').prop('disabled')).toEqual(true);
  });
});
