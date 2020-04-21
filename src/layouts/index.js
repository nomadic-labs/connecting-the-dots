import React from "react";
import Helmet from "react-helmet";
import withRoot from '../utils/withRoot';
import { connect } from "react-redux";

import NavigationContainer from "../containers/NavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Footer from "../components/Footer";

import {
  EditablesContext,
  theme
} from 'react-easy-editables';

import "../assets/sass/custom.scss";
import favicon from '../assets/images/icon.png'


// Brando template CSS

import "../assets/css/animate.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/et-line-icons.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/owl.transitions.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: '1'
  }
}

const editorTheme = {
  ...theme,
  primaryColor: '#FCB239'
}


const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  };
};

const TemplateWrapper = props => (
  <div style={styles.container}>
    <Helmet>
      <title>
        Connecting the Dots
      </title>
      <meta
        charSet="utf-8"
        description="Connecting The Dots aims to share common experiences among members of the African diaspora across the country."
        keywords="black, Canada, Canadian, Africa, diaspora"
        viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
      />
      <link rel="icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <NotificationContainer />
    <EditablesContext.Provider value={ { theme: editorTheme, showEditingControls: props.isEditingPage } }>
      <NavigationContainer menuItems={props.menuItems} />
      <div className='page-content' style={styles.content}>{props.children}</div>
      <Footer />
    </EditablesContext.Provider>
  </div>
);

export default withRoot(connect(mapStateToProps, null)(TemplateWrapper));
