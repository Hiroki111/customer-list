import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DisconnectedCustomerListItem } from 'components/Customers/CustomerListItem';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  // without the line below, `Link` won't be retrieved proprerly from react-router-dom
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('CustomerListItem', () => {
  const baseProps = {
    id: 0,
    name: 'John Test',
    groupName: 'N/A',
    isDeletingCustomer: false,
    handleDelete: jest.fn(),
    reloadCustomers: jest.fn(),
  };

  it("renders the person's name and its orginization name", () => {
    const wrapper = shallow(<DisconnectedCustomerListItem {...baseProps} />);
    expect(wrapper.text().includes('John Test')).toEqual(true);
    expect(wrapper.text().includes('N/A')).toEqual(true);
  });

  it('fires onClickDelete when the delete button is clicked', () => {
    window.confirm = jest.fn().mockImplementation(() => true);
    const wrapper = shallow(<DisconnectedCustomerListItem {...baseProps} />);
    wrapper.find('.delete-button').simulate('click');
    expect(baseProps.handleDelete).toHaveBeenCalled();
  });
});
