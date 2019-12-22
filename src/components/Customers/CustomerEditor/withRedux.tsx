import * as React from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from 'redux/customerEditor/operations';
import { getGroups } from 'redux/customerEditor/selectors';
import { IGroup } from 'interfaces/models';
import { IState } from 'redux/root';

interface IReduxProps {
  groups: IGroup[];
}

interface IDispatch {
  fetchGroups: () => void;
}

interface IOwnProps {
  handleClose: () => void;
}

export interface IWithReduxProps extends IReduxProps, IDispatch, IOwnProps {}

const WithRedux = (Component: React.ComponentType<IWithReduxProps>) => {
  class CustomerEditor extends React.Component<IWithReduxProps> {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.fetchGroups();
    }
  }

  const mapDispatchToProps = (dispatch: (action: any) => void): IDispatch => ({
    fetchGroups: () => dispatch(fetchGroups())
  });

  const mapStateToProps = (state: IState) => ({
    groups: getGroups(state)
  });

  return connect(mapStateToProps, mapDispatchToProps)(CustomerEditor);
};

export { WithRedux };
