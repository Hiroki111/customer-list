import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { WithRedux } from 'components/Customers/CustomerEditor/withRedux';
import createMockStore from 'redux-mock-store';

// Mock dependencies from selectors, operations and actions at the module level
// They are not passed into the component as normal props
jest.mock('redux/customerEditor/selectors', () => ({
  getCustomer: jest.fn(),
  getGroups: jest.fn(),
  getIsSavingCustomer: jest.fn(),
  getIsLoadingCurrentCustomer: jest.fn(),
  getFailedToLoadCurrentCustomer: jest.fn(),
  getCustomerIsSaved: jest.fn(),
  getFailedToSaveCustomer: jest.fn(),
  getErrorMessages: jest.fn(),
}));
jest.mock('redux/customerEditor/operations', () => ({
  fetchCustomer: jest.fn(),
  fetchGroups: jest.fn(),
  saveCustomer: jest.fn(),
}));
jest.mock('redux/customerEditor/actions', () => ({
  resetCreatingCustomerStatus: jest.fn(),
}));

configure({ adapter: new Adapter() });

describe('CustomerEditor WithRedux', () => {
  const baseProps = { handleClose: jest.fn() };
  const BaseComponent = () => <div />;
  const mockStore = createMockStore([thunk]);
  const store = mockStore({});

  // Mock implementations of the dependencies
  const { fetchCustomer, fetchGroups } = require('redux/customerEditor/operations');
  const { resetCreatingCustomerStatus } = require('redux/customerEditor/actions');
  fetchGroups.mockImplementation(() => ({ type: 'fetchGroups' }));
  fetchCustomer.mockImplementation((id: number) => ({ type: 'fetchCustomer' }));
  resetCreatingCustomerStatus.mockImplementation(() => ({ type: 'resetCreatingCustomerStatus' }));

  it('fetches groups, customer and resets customer status after mounted', () => {
    const history = createMemoryHistory({ initialEntries: ['/customers/edit/-1'] });
    const WithReduxComponent = WithRedux(BaseComponent);
    mount(
      <Provider store={store}>
        <Router history={history}>
          <Route path={'/customers/edit/:id'}>
            <WithReduxComponent {...baseProps} />
          </Route>
        </Router>
      </Provider>
    );

    expect(fetchGroups).toHaveBeenCalled();
    expect(fetchCustomer).toHaveBeenCalledWith(-1);
    expect(resetCreatingCustomerStatus).toHaveBeenCalled();
  });
});
