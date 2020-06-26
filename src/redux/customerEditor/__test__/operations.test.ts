import { AnyAction } from 'redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkAction } from 'redux-thunk';

import { IState } from 'redux/root';
import { saveCustomer, updateCustomer } from 'redux/customerEditor/operations';
import * as actions from 'redux/customerEditor/actions';

describe('customerEditor operations', () => {
  const mockStore = configureStore<IState, (dispatch: ThunkAction<Promise<any>, IState, void, AnyAction>) => any>([
    thunk,
  ]);
  let store = mockStore({} as IState);
  const mockCustomer = {
    id: -1,
    name: 'John Test',
    phone: '111 222 333',
    email: 'blah@example.com',
    address: 'Test st 1',
    note: '',
    group_id: 0,
  };
  const mockCallbak = jest.fn();

  beforeEach(() => {
    store = mockStore({} as IState);
  });
  it('should call createCustomer if the customer ID is a negative number', () => {
    return store.dispatch(saveCustomer(mockCustomer, mockCallbak)).then(() => {
      expect(store.getActions()).toContainEqual(actions.createCustomer());
    });
  });

  it('should call updateCustomer if the customer ID is a non-negative number', () => {
    const customer = { ...mockCustomer, id: 0 };
    return store.dispatch(updateCustomer(customer, mockCallbak)).then(() => {
      expect(store.getActions()).toContainEqual(actions.updateCustomer());
    });
  });
});
