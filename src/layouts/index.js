import React from "react";
import Helmet from "react-helmet";
import withRoot from '../utils/withRoot';

import NavigationContainer from "../containers/NavigationContainer";
import NotificationContainer from "../containers/NotificationContainer";
import Footer from "../components/Footer";

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

const TemplateWrapper = props => (
  <div>
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
    <NavigationContainer />
    <div className='page-content'>{props.children}</div>
    <Footer />
  </div>
);

export default withRoot(TemplateWrapper);