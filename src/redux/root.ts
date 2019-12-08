import { combineReducers } from 'redux';
import { ICustomerListState, customerListReducer } from 'redux/customerList/reducer';

export interface IState {
  customerList: ICustomerListState;
}

export default combineReducers<IState>({
  customerList: customerListReducer
});
