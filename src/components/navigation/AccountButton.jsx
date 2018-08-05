import React from "react";
import { push, Link } from "gatsby";
import firebase from "../../firebase/init";
import { connect } from "react-redux";

import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
  deploy,
  toggleEditing
} from "../../redux/actions";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import RegistrationModal from "./RegistrationModal";

const styles = {
  iconLabel: {
    display: "flex",
    alignItems: "center"
  }
};

class AccountButton extends React.Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }

      if (this.props.showRegistrationModal) {
        this.props.onToggleRegistrationModal();
      }
    });
  }

  logout = e => {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    push("/");
  };

  login = e => {
    this.props.onToggleRegistrationModal();
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { props, openMenu, closeMenu, logout, login } = this;
    const { anchorEl } = this.state;

    if (props.isLoggedIn) {
      const accountName = props.user.displayName
        ? props.user.displayName
        : "Account";
      const toggleText = props.isEditingPage ? "Done editing" : "Start editing";
      return (
        <div>
          <div
            className="highlight-button-black-border btn btn-small no-margin inner-link"
            onClick={openMenu}
            aria-owns={anchorEl ? "account-menu" : null}
            aria-haspopup="true"
          >
            <span style={styles.iconLabel}>
              {accountName}
              <ArrowDropDown style={{ height: "14px" }} />
            </span>
          </div>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  closeMenu();
                }}
                component={Link}
                to={'/project-review'}
                divider
              >
                Review submitted projects
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.onToggleEditing();
                  closeMenu();
                }}
              >
                {toggleText}
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.deploy();
                  closeMenu();
                }}
                divider
              >
                Publish changes
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                logout();
                closeMenu();
              }}
              divider
            >
              Log out
            </MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <span>
        <div
          className="highlight-button-black-border btn btn-small no-margin inner-link"
          onClick={login}
        >
          <span style={styles.iconLabel}>Sign In / Sign Up</span>
        </div>
        <RegistrationModal
          open={Boolean(props.showRegistrationModal)}
          onToggleRegistrationModal={props.onToggleRegistrationModal}
        />
      </span>
    );
  }
}

const mapStateToProps = state => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;

  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    showRegistrationModal: state.adminTools.showRegistrationModal,
    isEditingPage: state.adminTools.isEditingPage,
    allowEditing: allowEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleRegistrationModal: () => {
      dispatch(toggleRegistrationModal());
    },
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    deploy: () => {
      dispatch(deploy());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
