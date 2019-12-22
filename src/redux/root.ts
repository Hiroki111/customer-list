import { combineReducers } from 'redux';
import { ICustomerListState, customerListReducer } from 'redux/customerList/reducer';
import { ICustomerDetailState, customerDetailReducer } from 'redux/customerDetail/reducer';
import { ICustomerEditorState, customerEditorReducer } from 'redux/customerEditor/reducer';

export interface IState {
  customerList: ICustomerListState;
  customerDetail: ICustomerDetailState;
  customerEditor: ICustomerEditorState;
}

export default combineReducers<IState>({
  customerList: customerListReducer,
  customerDetail: customerDetailReducer,
  customerEditor: customerEditorReducer
});
