import React from 'react';
import { connect } from 'react-redux';
import { updateUserData } from '../store/actions';

const withUser = (WrappedComponent) => {
  const mapStateToProps = ({ user }) => {
    return {
      userData: user.data
    };
  };

  const mapDispatchToProps = dispatch => ({
    updateUserData: ({ userUid }) => dispatch(updateUserData(userUid)),
  });

  const loaderContainer = (props) => {
    return (<WrappedComponent {...props} />);
  };

  return connect(mapStateToProps, mapDispatchToProps)(loaderContainer);
};

export default withUser;
