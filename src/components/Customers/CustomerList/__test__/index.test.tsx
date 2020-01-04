import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DisconnectedCustomerList } from '../index';
import { CustomerListItem } from 'components/Customers/CustomerListItem';
import { ICustomer } from 'interfaces/models';

configure({ adapter: new Adapter() });

describe('CustomerList', () => {
  const baseProps = {
    customers: [
      { id: 1, name: 'John Test' },
      { id: 2, name: 'Bob Test' }
    ] as ICustomer[]
  };

  it('renders CustomerList', () => {
    const wrapper = shallow(<DisconnectedCustomerList {...baseProps} />);
    expect(wrapper.find(CustomerListItem).length).toEqual(2);
  });
});
