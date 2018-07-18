import React from 'react'
import firebase from "../firebase/init";
import { navigateTo } from 'gatsby-link';
import { connect } from "react-redux";
import {
  userLoggedOut,
} from "../redux/actions";

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    navigateTo('/')
  }

  render() {
    return(<div></div>)
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(
  LogoutPage
);
