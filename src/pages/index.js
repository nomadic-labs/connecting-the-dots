import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { updatePage, loadPageData } from "../redux/actions";

import Layout from "../layouts/index.js";
import BackgroundImage from "../components/editable/BackgroundImage";
import Editable from "../components/editable/Editable";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import RichTextEditor from "../components/editingTools/RichTextEditor";
import Statistic from "../components/editable/Statistic";

import BHOlogo from "../assets/images/bho-logo.png";
import GOClogo from "../assets/images/goc.png";

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data
  };
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(
  ({ pageData, onUpdatePageData }) => {
    const content = pageData ? pageData.content : {};
    const onSave = id => content => {
      onUpdatePageData("home", id, content);
    };

    return (
      <Layout>
        <section className="no-padding">
          <div className="owl-slider-full owl-carousel owl-theme light-pagination square-pagination dark-pagination-without-next-prev-arrow main-slider">
            <BackgroundImage
              content={content["landing-background"]}
              handleSave={onSave("landing-background")}
            >
              <div className="opacity-full bg-dark-gray"></div>
              <div className="container full-screen position-relative">
                <div className="slider-typography text-left">
                  <div className="slider-text-middle-main md-margin-eleven sm-margin-three xs-margin-thirteen">
                    <div className="slider-text-middle slider-typography-option1">
                      <span className="white-text font-weight-800 letter-spacing-1 alt-font text-italic">
                        <Editable
                          editor={PlainTextEditor}
                          content={content["landing-title"]}
                          handleSave={onSave("landing-title")}
                        >
                          {content["landing-title"]
                            ? content["landing-title"]["text"]
                            : "Title"}
                        </Editable>
                      </span>
                      <div className="bg-fast-yellow separator-line-extra-thick no-margin-lr margin-twelve md-no-margin-lr md-margin-six" />
                      <Editable
                        editor={PlainTextEditor}
                        content={content["landing-subtitle"]}
                        handleSave={onSave("landing-subtitle")}
                      >
                        <p className="white-text main-font title-small xs-width-80">
                          {content["landing-subtitle"]
                            ? content["landing-subtitle"]["text"]
                            : "Subtitle"}
                        </p>
                      </Editable>
                    </div>
                  </div>
                </div>
              </div>
            </BackgroundImage>
          </div>
        </section>

        <section id="about" className="wow fadeIn">
          <div className="container">
            <div className="row xs-text-center">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["mission-title"]}
                    handleSave={onSave("mission-title")}
                  >
                    {content["mission-title"]
                      ? content["mission-title"]["text"]
                      : "Title"}
                  </Editable>
                </h2>
              </div>
              <div className="col-md-5 col-sm-12">
                <Editable
                  editor={RichTextEditor}
                  content={content["mission-description"]}
                  handleSave={onSave("mission-description")}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content["mission-description"]
                        ? content["mission-description"]["text"]
                        : "Description"
                    }}
                  />
                </Editable>
              </div>
              <div className="col-md-6 col-sm-12 col-md-offset-1 sm-padding-five sm-no-padding-lr sm-no-padding-bottom xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom">
                <div className="col-md-3 col-sm-2 margin-five no-margin-bottom">
                  <span className="text-medium font-weight-200 black-text margin-five no-margin-lr no-margin-top display-block main-font xs-margin-five xs-no-margin-lr xs-no-margin-top">
                    a Black History Ottawa initiative
                  </span>
                  <img src={BHOlogo} alt="Black History Ottawa logo" />
                </div>
                <div className="col-md-4 col-sm-3 margin-five no-margin-bottom">
                  <span className="text-medium font-weight-200 black-text margin-five no-margin-lr no-margin-top display-block main-font xs-margin-five xs-no-margin-lr xs-no-margin-top">
                    supported by Government of Canada
                  </span>
                  <img src={GOClogo} alt="Government of Canada logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wow fadeIn no-padding-top">
          <div className="container">
            <div className="row">
              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["phase1-title"]}
                      handleSave={onSave("phase1-title")}
                    >
                      {content["phase1-title"]
                        ? content["phase1-title"]["text"]
                        : "Phase title"}
                    </Editable>
                  </h4>
                </span>
                <Editable
                  editor={PlainTextEditor}
                  content={content["phase1-description"]}
                  handleSave={onSave("phase1-description")}
                >
                  <p className="center-col width-90 text-medium">
                    {content["phase1-description"]
                      ? content["phase1-description"]["text"]
                      : "Phase description"}
                  </p>
                </Editable>
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["phase2-title"]}
                      handleSave={onSave("phase2-title")}
                    >
                      {content["phase2-title"]
                        ? content["phase2-title"]["text"]
                        : "Phase title"}
                    </Editable>
                  </h4>
                </span>
                <Editable
                  editor={PlainTextEditor}
                  content={content["phase2-description"]}
                  handleSave={onSave("phase2-description")}
                >
                  <p className="center-col width-90 text-medium">
                    {content["phase2-description"]
                      ? content["phase2-description"]["text"]
                      : "Phase description"}
                  </p>
                </Editable>
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["phase3-title"]}
                      handleSave={onSave("phase3-title")}
                    >
                      {content["phase3-title"]
                        ? content["phase3-title"]["text"]
                        : "Phase title"}
                    </Editable>
                  </h4>
                </span>
                <Editable
                  editor={PlainTextEditor}
                  content={content["phase3-description"]}
                  handleSave={onSave("phase3-description")}
                >
                  <p className="center-col width-90 text-medium">
                    {content["phase3-description"]
                      ? content["phase3-description"]["text"]
                      : "Phase description"}
                  </p>
                </Editable>
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>

              <div
                className="col-md-3 col-sm-4 testimonial-style1 text-left wow fadeInUp xs-margin-nineteen xs-no-margin-top xs-no-margin-lr"
                data-wow-duration="300ms"
              >
                <span className="name yellow-text">
                  <h4 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["phase4-title"]}
                      handleSave={onSave("phase4-title")}
                    >
                      {content["phase4-title"]
                        ? content["phase4-title"]["text"]
                        : "Phase title"}
                    </Editable>
                  </h4>
                </span>
                <Editable
                  editor={PlainTextEditor}
                  content={content["phase4-description"]}
                  handleSave={onSave("phase4-description")}
                >
                  <p className="center-col width-90 text-medium">
                    {content["phase4-description"]
                      ? content["phase4-description"]["text"]
                      : "Phase description"}
                  </p>
                </Editable>
                <i className="fa fa-arrow-circle-right icon-small yellow-text display-block margin-fifteen no-margin-bottom xs-margin-two xs-no-margin-bottom" />
              </div>
            </div>
          </div>
        </section>

        <section className="no-padding-top wow fadeIn" id="bho">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 padding-nine bg-black agency-skill md-padding-fifteen sm-padding-nineteen">
                <span className="title-extra-large alt-font white-text text-italic">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["bho-header"]}
                    handleSave={onSave("bho-header")}
                  >
                    {content["bho-header"]
                      ? content["bho-header"]["text"]
                      : "Header"}
                  </Editable>
                </span>

                <Editable
                  editor={RichTextEditor}
                  content={content["bho-description"]}
                  handleSave={onSave("bho-description")}
                >
                  <p
                    className="white-text text-medium margin-six no-margin-lr"
                    dangerouslySetInnerHTML={{
                      __html: content["bho-description"]
                        ? content["bho-description"]["text"]
                        : "Header"
                    }}
                  />
                </Editable>

                <a
                  className="highlight-button-white-border margin-six btn btn-medium no-margin-lr button inner-link"
                  href="#top"
                >
                  Support BHO{" "}
                  <i className="fa fa-heart-o icon-extra-small white-text" />
                </a>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 padding-4 bg-gray agency-skill md-padding-seventeen sm-padding-nineteen">
                <span className="text-medium font-weight-600 text-uppercase black-text margin-six display-block main-font">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["bho-objectives-header"]}
                    handleSave={onSave("bho-objectives-header")}
                  >
                    {content["bho-objectives-header"]
                      ? content["bho-objectives-header"]["text"]
                      : "Our Objectives"}
                  </Editable>
                </span>

                <div className="padding-six">
                  <Editable
                    editor={RichTextEditor}
                    content={content["bho-objectives-details"]}
                    handleSave={onSave("bho-objectives-details")}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content["bho-objectives-details"]
                          ? content["bho-objectives-details"]["text"]
                          : "Details"
                      }}
                    />
                  </Editable>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tour" className="border-top wow fadeIn no-padding-bottom">
          <div className="container xs-text-center">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font font-weight-600  text-italic text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-eight no-margin-lr no-margin-top">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["tour-title"]}
                    handleSave={onSave("tour-title")}
                  >
                    {content["tour-title"]
                      ? content["tour-title"]["text"]
                      : "Title"}
                  </Editable>
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <span className="text-extra-large margin-fourteen no-margin-lr no-margin-top display-inline-block main-font black-text md-margin-seventeen md-no-margin-lr md-no-margin-top sm-margin-nine sm-no-margin-lr sm-no-margin-top">
                  <Editable
                    editor={RichTextEditor}
                    content={content["tour-description"]}
                    handleSave={onSave("tour-description")}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content["tour-description"]
                          ? content["tour-description"]["text"]
                          : "Details"
                      }}
                    />
                  </Editable>
                </span>
                <div>
                  <a
                    href="#contact"
                    className="highlight-button-black-border btn btn-medium button inner-link xs-no-margin"
                  >
                    Let's Work Together
                  </a>
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
                />
                <Statistic
                  content={content["statistic4"]}
                  handleSave={onSave("statistic4")}
                />
              </div>
            </div>
          </div>
          <div className="container-fluid display-inline-block margin-eight no-margin-lr no-margin-bottom md-margin-twenty-three md-no-margin-bottom md-no-margin-lr sm-margin-five sm-no-margin-lr sm-no-margin-buttom xs-margin-eleven xs-no-margin-lr xs-no-margin-buttom">
            <div className="row">
              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="" />
                <img src="images/bg-01.png" alt="" />
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
                      href="https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/dt-td/Rp-eng.cfm?TABID=2&LANG=E&APATH=3&DETAIL=0&DIM=0&FL=A&FREE=0&GC=0&GK=0&GRP=1&PID=110531&PRID=10&PTYPE=109445&S=0&SHOWALL=0&SUB=0&Temporal=2017&THEME=120&VID=0&VNAMEE=&VNAMEF="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="highlight-button-black-border btn btn-medium button inner-link xs-no-margin"
                    >
                      2016 Census
                    </a>
                  </figcaption>
                </figure>
              </div>

              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src="images/toronto.jpg" alt="" />
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
              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src="images/calgary.jpg" alt="" />
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
              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src="images/vancouver.jpg" alt="" />
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
              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src="images/halifax.jpg" alt="" />
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
              <div className="col-md-2 col-sm-6 no-padding team-style1 overflow-hidden">
                <div className="opacity-light" />
                <img src="images/montreal.jpg" alt="" />
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
            </div>
          </div>
        </section>

        <section
          id="areas-of-focus"
          className="wow fadeIn no-padding-top no-padding-bottom"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 bg-gray service padding-seven md-padding-seventeen xs-padding-twenty-nine xs-no-padding-lr">
                <div className="row">
                  <div className="col-md-12 col-sm-12 text-center">
                    <h2 className="alt-font font-weight-600 text-italic  text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-eight no-margin-top">
                      <Editable
                        editor={PlainTextEditor}
                        content={content["focus-title"]}
                        handleSave={onSave("focus-title")}
                      >
                        {content["focus-title"]
                          ? content["focus-title"]["text"]
                          : "Header"}
                      </Editable>
                    </h2>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-book-open icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus1-header"]}
                      handleSave={onSave("focus1-header")}
                    >
                      {content["focus1-header"]
                        ? content["focus1-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus1-description"]}
                    handleSave={onSave("focus1-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus1-description"]
                        ? content["focus1-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-paintbrush icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus2-header"]}
                      handleSave={onSave("focus2-header")}
                    >
                      {content["focus2-header"]
                        ? content["focus2-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus2-description"]}
                    handleSave={onSave("focus2-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus2-description"]
                        ? content["focus2-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-global icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus3-header"]}
                      handleSave={onSave("focus3-header")}
                    >
                      {content["focus3-header"]
                        ? content["focus3-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus3-description"]}
                    handleSave={onSave("focus3-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus3-description"]
                        ? content["focus3-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-refresh icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus4-header"]}
                      handleSave={onSave("focus4-header")}
                    >
                      {content["focus4-header"]
                        ? content["focus4-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus4-description"]}
                    handleSave={onSave("focus4-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus4-description"]
                        ? content["focus4-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-happy icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus5-header"]}
                      handleSave={onSave("focus5-header")}
                    >
                      {content["focus5-header"]
                        ? content["focus5-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus5-description"]}
                    handleSave={onSave("focus5-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus5-description"]
                        ? content["focus5-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-circle-compass icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["6-header"]}
                      handleSave={onSave("6-header")}
                    >
                      {content["6-header"]
                        ? content["6-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["6-description"]}
                    handleSave={onSave("6-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["6-description"]
                        ? content["6-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-wallet icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus7-header"]}
                      handleSave={onSave("focus7-header")}
                    >
                      {content["focus7-header"]
                        ? content["focus7-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus7-description"]}
                    handleSave={onSave("focus7-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus7-description"]
                        ? content["focus7-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>

                <div className="col-md-3 col-sm-12 service-sub text-center">
                  <i className="icon-chat icon-extra-large fast-yellow-text margin-seven no-margin-lr no-margin-top" />
                  <span className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["focus8-header"]}
                      handleSave={onSave("focus8-header")}
                    >
                      {content["focus8-header"]
                        ? content["focus8-header"]["text"]
                        : "Header"}
                    </Editable>
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["focus8-description"]}
                    handleSave={onSave("focus8-description")}
                  >
                    <p className="text-medium width-80 center-col">
                      {content["focus8-description"]
                        ? content["focus8-description"]["text"]
                        : "Header"}
                    </p>
                  </Editable>
                </div>
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
                  <Editable
                    editor={PlainTextEditor}
                    content={content["get-involved-cta"]}
                    handleSave={onSave("get-involved-cta")}
                  >
                    {content["get-involved-cta"]
                      ? content["get-involved-cta"]["text"]
                      : "Want to get involved?"}
                  </Editable>
                </span>
                <a
                  href="#contact"
                  className="highlight-button-dark btn btn-medium button inner-link xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom"
                >
                  Support BHO
                </a>
                <a
                  href="#contact"
                  className="highlight-button-dark btn btn-medium button inner-link xs-margin-eleven xs-no-margin-lr xs-no-margin-bottom"
                >
                  Submit a project
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="wow fadeIn">
          <div className="container xs-text-center">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h2 className="alt-font font-weight-600 text-italic title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-2 margin-six no-margin-lr no-margin-top">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["contact-title"]}
                    handleSave={onSave("contact-title")}
                  >
                    {content["contact-title"]
                      ? content["contact-title"]["text"]
                      : "Contact us"}
                  </Editable>
                </h2>
              </div>
            </div>
            <div className="row call-us">
              <div className="col-sm-12">
                <span className="text-extra-large margin-six no-margin-lr no-margin-top display-inline-block alt-font black-text">
                  <Editable
                    editor={PlainTextEditor}
                    content={content["contact-message"]}
                    handleSave={onSave("contact-message")}
                  >
                    {content["contact-message"]
                      ? content["contact-message"]["text"]
                      : "Get in touch"}
                  </Editable>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 col-sm-12 margin-nine no-margin-bottom no-margin-lr">
                <div className="sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text ">
                    Address
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["contact-address"]}
                    handleSave={onSave("contact-address")}
                  >
                    <p className="text-medium">
                      {content["contact-address"]
                        ? content["contact-address"]["text"]
                        : "Get in touch"}
                    </p>
                  </Editable>
                </div>
                <div className="margin-thirteen no-margin-lr sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text">
                    Email
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["contact-email"]}
                    handleSave={onSave("contact-email")}
                  >
                    <p className="text-medium">
                      {content["contact-email"]
                        ? content["contact-email"]["text"]
                        : "example@host.com"}
                    </p>
                  </Editable>
                </div>
                <div className="margin-six no-margin-lr sm-margin-nine sm-no-margin-tb sm-no-margin-left sm-display-inline-table xs-margin-nine xs-no-margin-lr xs-no-margin-top xs-width-100">
                  <span className="text-uppercase alt-font black-text">
                    Phone
                  </span>
                  <Editable
                    editor={PlainTextEditor}
                    content={content["contact-phone"]}
                    handleSave={onSave("contact-phone")}
                  >
                    <p className="text-medium">
                      {content["contact-phone"]
                        ? content["contact-phone"]["text"]
                        : "123-456-7890"}
                    </p>
                  </Editable>
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
                    name="_next"
                    value="http://connectingthedots.ca/"
                  />
                  <input type="text" name="_gotcha" style={{display: "none"}} />
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
);

class PageContainer extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  render() {
    return <HomePage />;
  }
}

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      content
      title
      slug
      template
      page_type
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
