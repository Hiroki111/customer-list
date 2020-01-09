import { customerEditorReducer } from '../reducer';
import * as types from '../types';
import { Status } from 'redux/types';

describe('customerEditorReducer', () => {
  const mockCustomer = {
    id: 100,
    name: 'John Test',
    phone: '111 222 333',
    email: 'blah@example.com',
    address: 'Test st 1',
    note: '',
    group_id: 0
  };
  const mockGroups = [{ id: 1, name: 'Sample Group' }];

  it('can reset status for saving the customer and error messages', () => {
    const mockState = {
      customer: mockCustomer,
      groups: mockGroups,
      status: {
        fetchingCustomer: 'PENDING' as Status,
        fetchingGroups: 'PENDING' as Status,
        creatingCustomer: 'PENDING' as Status,
        updatingCustomer: 'PENDING' as Status
      },
      errorMessages: {
        creatingCustomer: ['Blah blah'],
        updatingCustomer: ['Blah blah']
      }
    };

    const newState = customerEditorReducer(mockState, { type: types.RESET_CREATE_CUSTOMER_STATUS });

    expect(newState).toEqual({
      customer: mockCustomer,
      groups: mockGroups,
      status: {
        fetchingCustomer: 'PENDING',
        fetchingGroups: 'PENDING',
        creatingCustomer: '',
        updatingCustomer: ''
      },
      errorMessages: {
        creatingCustomer: [],
        updatingCustomer: []
      }
    });
  });
});
