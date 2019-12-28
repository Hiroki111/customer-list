import { combineReducers } from 'redux';
import { ICustomerListState, customerListReducer } from 'redux/customerList/reducer';
import { ICustomerEditorState, customerEditorReducer } from 'redux/customerEditor/reducer';

export interface IState {
  customerList: ICustomerListState;
  customerEditor: ICustomerEditorState;
}

export default combineReducers<IState>({
  customerList: customerListReducer,
  customerEditor: customerEditorReducer
});
