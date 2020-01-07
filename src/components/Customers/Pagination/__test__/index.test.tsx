import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactPaginate from 'react-paginate';
import { DisconnectedPagination } from '../index';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

describe('Pagination', () => {
  const baseProps = {
    totalPage: 1,
    currentPage: 1,
    isLoadingCustomers: false,
    fetchCustomers: jest.fn()
  };

  it('renders ReactPaginate', () => {
    const wrapper = shallow(<DisconnectedPagination {...baseProps} />);
    expect(wrapper.find(ReactPaginate).length).toEqual(1);
  });

  it('does not render ReactPaginate if it is loading customers', () => {
    const wrapper = shallow(<DisconnectedPagination {...baseProps} />);
    wrapper.setProps({ isLoadingCustomers: true });
    expect(wrapper.find(ReactPaginate).length).toEqual(0);
  });

  it('does not render ReactPaginate if totalPage is less than 1', () => {
    const wrapper = shallow(<DisconnectedPagination {...baseProps} />);
    wrapper.setProps({ totalPage: 0 });
    expect(wrapper.find(ReactPaginate).length).toEqual(0);
  });
});
