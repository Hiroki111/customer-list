import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DisconnectedSearchBox } from '../index';

configure({ adapter: new Adapter() });

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    location: { search: '' }
  })
}));

describe('SearchBox', () => {
  const baseProps = { isLoadingCustomers: false };
  const changeEvent = { target: { value: '' } };

  it('enables the search and reset buttons while it is not loading customers', () => {
    const wrapper = shallow(<DisconnectedSearchBox {...baseProps} />);
    expect(wrapper.find('.submit-search-box-botton').prop('disabled')).toEqual(false);
    expect(wrapper.find('.reset-search-box-botton').prop('disabled')).toEqual(false);
  });

  it('disables the search and reset buttons while it is loading customers', () => {
    const wrapper = shallow(<DisconnectedSearchBox {...baseProps} />);
    wrapper.setProps({ isLoadingCustomers: true });
    expect(wrapper.find('.submit-search-box-botton').prop('disabled')).toEqual(true);
    expect(wrapper.find('.reset-search-box-botton').prop('disabled')).toEqual(true);
  });

  it('calls history.push when submit button is pressed', () => {
    const props = { ...baseProps };
    const wrapper = shallow(<DisconnectedSearchBox {...props} />);
    const keyword = ' Blah Blah ';
    const queryParameter = `?page=1&keyword=Blah Blah`;
    changeEvent.target.value = keyword;
    wrapper.find('input').simulate('change', changeEvent);
    wrapper.find('.submit-search-box-botton').simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith(`/customers${queryParameter}`);
  });
});
