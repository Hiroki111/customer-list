import { combineReducers } from 'redux';
import { ICustomerListState, customerListReducer } from 'redux/customerList/reducer';
import { ICustomerDetailState, customerDetailReducer } from 'redux/customerDetail/reducer';

export interface IState {
  customerList: ICustomerListState;
  customerDetail: ICustomerDetailState;
}

export default combineReducers<IState>({
  customerList: customerListReducer,
  customerDetail: customerDetailReducer
});
