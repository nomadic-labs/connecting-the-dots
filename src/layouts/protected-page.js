import React from "react";
import { connect } from "react-redux";
// import { push } from 'gatsby';

const mapStateToProps = state => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;

  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    allowEditing: allowEditing,
    user: state.adminTools.user
  };
};

const ProtectedPage = props => {
  if (props.editor && props.allowEditing) {
    return <div>{props.children}</div>
  }

  if (!props.editor && props.isLoggedIn) {
    return <div>{props.children}</div>
  }

  return <div>You must be logged in to see this page.</div>
}



export default connect(mapStateToProps, null)(ProtectedPage);