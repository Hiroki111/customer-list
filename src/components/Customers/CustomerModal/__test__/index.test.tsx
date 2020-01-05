import * as React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CustomerModal } from '../index';
import MessageBox from 'utils/components/MessageBox';
import LoadingSpinner from 'utils/components/LoadingSpinner';

configure({ adapter: new Adapter() });

describe('CustomerModal', () => {
  const baseProps = {
    handleClose: jest.fn(),
    title: 'Create Customer',
    showLoadingSpinner: false,
    showWarning: false,
    children: <div className="children">test</div>
  };

  it('renders LoadingSpinner if showLoadingSpinner is true', () => {
    const wrapper = shallow(<CustomerModal {...baseProps} />);
    wrapper.setProps({ showLoadingSpinner: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(1);
    expect(wrapper.find(MessageBox).length).toEqual(0);
    expect(wrapper.find('.children').length).toEqual(0);
  });

  it('renders MessageBox if showWarning is true', () => {
    const wrapper = shallow(<CustomerModal {...baseProps} />);
    wrapper.setProps({ showWarning: true });
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(MessageBox).length).toEqual(1);
    expect(wrapper.find('.children').length).toEqual(0);
    expect(
      wrapper
        .find(MessageBox)
        .render()
        .text()
    ).toEqual('ERROR : Please try again later.');
  });

  it('renders children', () => {
    const wrapper = shallow(<CustomerModal {...baseProps} />);
    expect(wrapper.find(LoadingSpinner).length).toEqual(0);
    expect(wrapper.find(MessageBox).length).toEqual(0);
    expect(wrapper.find('.children').length).toEqual(1);
  });
});
