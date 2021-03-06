import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  EditableLink,
  EditableText,
  EditableParagraph,
  EditableBackgroundImage
} from "react-easy-editables"

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"
import { uploadImage } from "../firebase/operations"

import {
  updatePage,
  loadPageData,
  showNotificationByName,
  pushContentItem,
  removeContentItem,
} from "../redux/actions";

import Layout from "../layouts/index.js";
import Statistic from "../components/editable/Statistic";
import PartnerLogo from "../components/PartnerLogo";
import YoutubeVideoFeed from "../components/YoutubeVideoFeed";
import Collection from "../components/editable/Collection";

import BHOlogo from "../assets/images/bho-logo.png";
import GOClogo from "../assets/images/goc.png";

import coast from "../assets/images/bg-01.png";
import bg02 from "../assets/images/bg-02.jpg";
import toronto from "../assets/images/toronto.jpg";
import calgary from "../assets/images/calgary.jpg";
import halifax from "../assets/images/halifax.jpg";
import montreal from "../assets/images/montreal.jpg";
import vancouver from "../assets/images/vancouver.jpg";
import winnipeg from "../assets/images/winnipeg.jpg";


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    showNotificationByName: name => {
      dispatch(showNotificationByName(name));
    },
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  componentDidMount() {
    if (this.props.location.search) {
      const notificationName = this.props.location.search.split(
        "notification="
      )[1];
      this.props.showNotificationByName(notificationName);
    }
  }

  onSave = id => content => {
    this.props.onUpdatePageData("home", id, content);
  };

  onAddItem = id => content => {
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  render() {
    const { pageData, isEditingPage, data } = this.props;
    const { onSave, onAddItem, onDeleteItem } = this;
    const content = pageData ? pageData.content : JSON.parse(data.pages.content);
    const menuItems = pageData ? pageData.menu : {};

    return (
      <Layout menuItems={menuItems}>
        <section className="no-padding" id="landing">
          <EditableBackgroundImage
            content={content["landing-background"]}
            handleSave={onSave("landing-background")}
            uploadImage={uploadImage}
          >
            <div className="position-relative">
            <div className="opacity-medium bg-dark-gray"></div>
              <div className="container full-screen position-relative">
                <div className="slider-typography text-left">
                  <div className="slider-text-middle-main md-margin-eleven sm-margin-three xs-margin-thirteen">
                    <div className="slider-text-middle slider-typography-option1">
                      <span className="white-text font-weight-800 letter-spacing-1 alt-font text-italic">
                        <EditableText
                          content={content["landing-title"]}
                          handleSave={onSave("landing-title")}
                        />
                      </span>
                      <div className="bg-fast-yellow separator-line-extra-thick no-margin-lr margin-twelve md-no-margin-lr md-margin-six" />
                        <p className="white-text main-font title-small xs-width-80">
                          <EditableText
                            content={content["landing-subtitle"]}
                            handleSave={onSave("landing-subtitle")}
                          />
                          </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </EditableBackgroundImage>
        </section>

        <section id="about" className="wow fadeIn">
          <div className="container">
            <div className="row xs-text-center">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                  <EditableText
                    content={content["mission-title"]}
                    handleSave={onSave("mission-title")}
                  />
                </h2>
              </div>
              <div className="col-md-5 col-sm-12">
                <EditableParagraph
                  classes="text-extra-large black-text"
                  content={content["mission-description"]}
                  handleSave={onSave("mission-description")}
                />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 col-md-offset-1 sm-padding-five sm-no-padding-lr sm-no-padding-bottom xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom">
                <div className="col-md-6 col-sm-6 service-sub text-center">
                  <div className="logo-container">
                    <img src={BHOlogo} alt="Black History Ottawa logo" />
                  </div>
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    a Black History Ottawa initiative
                  </span>
                </div>

                <div className="col-md-6 col-sm-6 service-sub text-center">
                  <div className="logo-container">
                    <img src={GOClogo} alt="Government of Canada logo" />
                  </div>
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    supported by the Government of Canada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wow fadeIn no-padding-top no-padding-bottom" id="who-we-are">
          <div className="container-fluid flex">
            <div className="row">
              <div className="xs-col-12 col-md-6 h-100 no-padding">
                <EditableBackgroundImage
                  content={content["who-we-are-img"]}
                  handleSave={onSave("who-we-are-img")}
                />
              </div>
              <div className="xs-col-12 col-md-6 bg-black padding-seven md-padding-seventeen xs-padding-twenty-nine">
                <div className="title-large display-inline-block white-text">
                  <EditableParagraph
                    content={content["who-we-are"]}
                    handleSave={onSave("who-we-are")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wow fadeIn bg-fast-yellow" id="digital-stories">
          <div className="container">
            <div className="row xs-text-center">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-white display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                  <EditableText
                    content={content["ditital-stories-title"]}
                    handleSave={onSave("ditital-stories-title")}
                  />
                </h2>
              </div>
            </div>

            <div className="row xs-text-center">
              <YoutubeVideoFeed />
            </div>
          </div>
        </section>

        <section className="wow fadeIn">
          <div className="container">
            <div className="row xs-text-center">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                  <EditableText
                    content={content["phases-title"]}
                    handleSave={onSave("phases-title")}
                  />
                </h2>
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <EditableText
                      content={content["phase1-title"]}
                      handleSave={onSave("phase1-title")}
                    />
                  </h4>
                </span>
                <EditableParagraph
                  classes="center-col width-90 text-medium"
                  content={content["phase1-description"]}
                  handleSave={onSave("phase1-description")}
                />
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <EditableText
                      content={content["phase2-title"]}
                      handleSave={onSave("phase2-title")}
                    />
                  </h4>
                </span>
                <EditableParagraph
                  classes="center-col width-90 text-medium"
                  content={content["phase2-description"]}
                  handleSave={onSave("phase2-description")}
                />
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <EditableText
                      content={content["phase3-title"]}
                      handleSave={onSave("phase3-title")}
                    />
                  </h4>
                </span>
                <EditableParagraph
                  classes="center-col width-90 text-medium"
                  content={content["phase3-description"]}
                  handleSave={onSave("phase3-description")}
                />
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <EditableText
                      content={content["phase4-title"]}
                      handleSave={onSave("phase4-title")}
                    />
                  </h4>
                </span>
                <EditableParagraph
                  classes="center-col width-90 text-medium"
                  content={content["phase4-description"]}
                  handleSave={onSave("phase4-description")}
                />
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="get-involved"
          className="wow fadeIn bg-fast-yellow work-with-us"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 text-center">
                <i className="icon-heart icon-large black-text" />
                <span className="title-medium alt-font black-text display-block margin-four text-uppercase">
                  <EditableText
                    content={content["get-involved-cta"]}
                    handleSave={onSave("get-involved-cta")}
                  />
                </span>
                <EditableLink
                  content={content["get-involved-btn-1"]}
                  onSave={onSave("get-involved-btn-1")}
                  classes="highlight-button btn btn-medium button inner-link xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom"
                />
                <EditableLink
                  content={content["get-involved-btn-2"]}
                  onSave={onSave("get-involved-btn-2")}
                  classes="highlight-button-dark btn btn-medium button inner-link xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="tour" className="border-top wow fadeIn no-padding-bottom">
          <div className="container xs-text-center">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font font-weight-600 text-italic text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-eight no-margin-lr no-margin-top">
                  <EditableText
                    content={content["tour-title"]}
                    handleSave={onSave("tour-title")}
                  />
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <span className="text-extra-large margin-fourteen no-margin-lr no-margin-top display-inline-block main-font black-text md-margin-seventeen md-no-margin-lr md-no-margin-top sm-margin-nine sm-no-margin-lr sm-no-margin-top">
                  <EditableParagraph
                    content={content["tour-description"]}
                    handleSave={onSave("tour-description")}
                  />
                </span>
                <div>
                  <EditableLink
                    content={content["work-together-btn"]}
                    onSave={onSave("work-together-btn")}
                    classes="highlight-button-black-border btn btn-medium button inner-link xs-no-margin"
                  />
                </div>
              </div>
              <div className="col-md-7 col-sm-12 text-center sm-margin-fifteen sm-no-margin-lr sm-no-margin-buttom">
                <Statistic
                  content={content["statistic1"]}
                  handleSave={onSave("statistic1")}
                />
                <Statistic
                  content={content["statistic2"]}
                  handleSave={onSave("statistic2")}
                />
                <Statistic
                  content={content["statistic3"]}
                  handleSave={onSave("statistic3")}
                  last={true}
                />
              </div>
            </div>
          </div>
          <div className="container-fluid display-inline-block margin-eight no-margin-lr no-margin-bottom md-margin-twenty-three md-no-margin-bottom md-no-margin-lr sm-margin-five sm-no-margin-lr sm-no-margin-buttom xs-margin-eleven xs-no-margin-lr xs-no-margin-buttom">
            <div className="row">

              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="" />
                <img src={coast} alt="Coast to Coast" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Coast-to-Coast
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      1,198,545 Black Canadians
                    </span>

                    <a
                      href="https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/index-eng.cfm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="highlight-button-black-border btn btn-medium button inner-link xs-no-margin"
                    >
                      2016 Census
                    </a>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={toronto} alt="Toronto, Ontario" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Ontario
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      627,715 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={calgary} alt="Calgary, Alberta" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Alberta
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      129,395 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={vancouver} alt="Vancouver, British Columbia" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    British Columbia
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      43,500 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={halifax} alt="Halifax, Nova Scotia" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Nova Scotia
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      21,915 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={montreal} alt="Montreal, Québec" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Quebec
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      319,230 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-3 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src={winnipeg} alt="Winnipeg, Manitoba" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large bg-white letter-spacing-3 md-text-small sm-text-large no-wrap">
                    Manitoba
                  </span>
                </div>
                <figure className="text-center padding-thirty">
                  <figcaption>
                    <span className="alt-font font-weight-100 text-medium letter-spacing-2 text-uppercase black-text title-underline padding-fifteen margin-sixteen display-inline-block no-margin-top no-padding-top no-padding-lr no-margin-lr">
                      30,335 Black Canadians
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-3 col-sm-6 no-padding overflow-hidden team-style1-end pos-relative">
                <img src={bg02} alt="" />
                <div className="team-mood text-center">
                  <span className="text-uppercase alt-font font-weight-400 text-large letter-spacing-3 md-text-small sm-text-large no-wrap">
                    <a
                      href="https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/index-eng.cfm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="highlight-button-black-border btn btn-medium button inner-link xs-no-margin"
                    >
                      2016 Census
                    </a>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section
          id="areas-of-focus"
          className="wow fadeIn no-padding-top no-padding-bottom"
        >
          <div className="container-fluid">
            <div className="row xs-text-center">
              <div className="col-lg-12 col-md-12 col-sm-12 bg-gray service padding-seven md-padding-seventeen xs-padding-twenty-nine xs-no-padding-lr">
                <div className="col-md-12 col-sm-12 text-left xs-text-center">
                  <h2 className="alt-font font-weight-600 text-italic  text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-eight no-margin-top">
                    <EditableText
                      content={content["focus-title"]}
                      handleSave={onSave("focus-title")}
                    />
                  </h2>
                </div>
                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-book-open icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus1-header"]}
                      handleSave={onSave("focus1-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus1-description"]}
                      handleSave={onSave("focus1-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-paintbrush icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus2-header"]}
                      handleSave={onSave("focus2-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus2-description"]}
                      handleSave={onSave("focus2-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-megaphone icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus3-header"]}
                      handleSave={onSave("focus3-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus3-description"]}
                      handleSave={onSave("focus3-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-refresh icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus4-header"]}
                      handleSave={onSave("focus4-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus4-description"]}
                      handleSave={onSave("focus4-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-heart icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus5-header"]}
                      handleSave={onSave("focus5-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      classes="text-medium width-80 center-col"
                      content={content["focus5-description"]}
                      handleSave={onSave("focus5-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-circle-compass icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["6-header"]}
                      handleSave={onSave("6-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["6-description"]}
                      handleSave={onSave("6-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-wallet icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus7-header"]}
                      handleSave={onSave("focus7-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus7-description"]}
                      handleSave={onSave("focus7-description")}
                    />
                  </p>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-chat icon-extra-large purple-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <EditableText
                      content={content["focus8-header"]}
                      handleSave={onSave("focus8-header")}
                    />
                  </span>
                  <p className="text-medium width-80 center-col">
                    <EditableText
                      content={content["focus8-description"]}
                      handleSave={onSave("focus8-description")}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-padding wow fadeIn" id="bho">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 padding-nine bg-black agency-skill md-padding-fifteen sm-padding-nineteen">
                <span className="title-extra-large alt-font white-text text-italic">
                  <EditableText
                    content={content["bho-header"]}
                    handleSave={onSave("bho-header")}
                  />
                </span>

                <EditableParagraph
                  classes="white-text text-extra-large margin-six no-margin-lr"
                  content={content["bho-description"]}
                  handleSave={onSave("bho-description")}
                />

                <EditableLink
                  content={content["support-btn"]}
                  onSave={onSave("support-btn")}
                  classes="highlight-button-white-border margin-six btn btn-medium no-margin-lr button inner-link"
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 padding-4 bg-gray agency-skill md-padding-seventeen sm-padding-nineteen">
                <span className="text-medium font-weight-600 text-uppercase black-text margin-six display-block main-font">
                  <EditableText
                    content={content["bho-objectives-header"]}
                    handleSave={onSave("bho-objectives-header")}
                  />
                </span>

                <div className="padding-six">
                  <EditableParagraph
                    content={content["bho-objectives-details"]}
                    handleSave={onSave("bho-objectives-details")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="donate" className="wow fadeIn bg-fast-yellow work-with-us">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 text-center">
                <i className="icon-gift icon-large black-text" />
                <div className="title-medium alt-font black-text display-flex-center margin-four text-uppercase">
                  <Statistic
                    content={content["dollars-raised"]}
                    handleSave={onSave("dollars-raised")}
                    prefix="$"
                  />
                  <Statistic
                    content={content["fundraising-target"]}
                    handleSave={onSave("fundraising-target")}
                    last={true}
                    prefix="$"
                  />
                </div>

                <div className="title-medium alt-font black-text display-block margin-four text-uppercase">
                  <EditableText
                    content={content["donate-cta"]}
                    handleSave={onSave("donate-cta")}
                  />
                </div>
                <EditableLink
                  content={content["donate-btn"]}
                  onSave={onSave("donate-btn")}
                  classes="highlight-button-dark btn btn-medium button inner-link xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="wow fadeIn animated no-padding-bottom"
          style={{ visibility: "visible", animationName: "fadeIn" }}
          id="partners"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 text-left xs-text-center">
                <h2 className="alt-font font-weight-600 text-italic text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-eight no-margin-top">
                  {`Our Partners`}
                </h2>
              </div>
            </div>
            <Collection
              items={content["partner-logos"]}
              Component={PartnerLogo}
              onSave={onSave('partner-logos')}
              onAddItem={onAddItem('partner-logos')}
              onDeleteItem={onDeleteItem('partner-logos')}
              isEditingPage={isEditingPage}
              defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
              classes="row margin-eight no-margin-bottom"
            />
          </div>
        </section>

        <section id="contact" className="wow fadeIn">
          <div className="container xs-text-center">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font font-weight-600 text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-six no-margin-lr no-margin-top">
                  <EditableText
                    content={content["contact-title"]}
                    handleSave={onSave("contact-title")}
                  />
                </h2>
              </div>
            </div>
            <div className="row call-us">
              <div className="col-sm-12">
                <span className="text-extra-large margin-six no-margin-lr no-margin-top display-inline-block black-text">
                  <EditableText
                    content={content["contact-message"]}
                    handleSave={onSave("contact-message")}
                  />
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-sm-12 margin-nine no-margin-bottom no-margin-lr">
                <div className="sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text ">
                    Address
                  </span>
                  <EditableParagraph
                    classes="text-medium"
                    content={content["contact-address"]}
                    handleSave={onSave("contact-address")}
                  />
                </div>
                <div className="margin-thirteen no-margin-lr sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text">
                    Email
                  </span>
                  <EditableParagraph
                    classes="text-medium"
                    content={content["contact-email"]}
                    handleSave={onSave("contact-email")}
                  />
                </div>
                <div className="margin-six no-margin-lr sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text">
                    Phone
                  </span>
                  <EditableParagraph
                    classes="text-medium"
                    content={content["contact-phone"]}
                    handleSave={onSave("contact-phone")}
                  />
                </div>
              </div>
              <div className="col-md-7 col-sm-12 margin-nine no-margin-bottom no-margin-lr">
                <form
                  id="contact-form"
                  method="POST"
                  action="https://formspree.io/connectingthedots.bho@gmail.com"
                >
                  <div id="success" className="no-margin-lr" />
                  <input
                    type="text"
                    name="Name"
                    id="name"
                    placeholder="* YOUR NAME"
                    className="big-input alt-font"
                    required
                  />
                  <input
                    type="email"
                    name="_replyto"
                    id="email"
                    required
                    placeholder="* YOUR EMAIL"
                    className="big-input alt-font"
                  />
                  <textarea
                    name="Comment"
                    id="comment"
                    placeholder="YOUR MESSAGE"
                    className="big-input alt-font"
                  />
                  <input
                    type="hidden"
                    name="_subject"
                    value="You're received a message from the Connecting the Dots contact form!"
                  />
                  <input
                    type="hidden"
                    name="_next"
                    value="https://www.connectingthedots.ca/?notification=contact-form-success"
                  />
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                  />
                  <button
                    id="agency-contact-button"
                    type="submit"
                    className="highlight-button-dark btn btn-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      content
      title
      slug
      template
      page_type
      menu {
        left {
          content {
            anchor
            link
          }
        }
        right {
          content {
            anchor
            link
          }
        }
      }
    }
  }
`;

