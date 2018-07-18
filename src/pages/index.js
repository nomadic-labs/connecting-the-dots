import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { connect } from "react-redux";
import { updatePageData } from "../redux/actions";

import Layout from "../layouts/index.js";
import BasicPage from "../templates/basicPage.jsx";
import BackgroundImage from "../components/editable/BackgroundImage";
import Editable from "../components/editable/Editable";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import RichTextEditor from "../components/editingTools/RichTextEditor";

import BHOlogo from "../assets/images/bho-logo.png";
import GOClogo from "../assets/images/goc.png";

const HomePage = ({ data, onUpdatePageData }) => {
  const pageData = { ...data.pages, content: JSON.parse(data.pages.content) };
  const content = JSON.parse(data.pages.content);
  console.log("pageData", pageData);

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
            <div className="opacity-light bg-dark-gray" />
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
                      <p className="white-text main-font text-large xs-width-80">
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
                {content["mission-description"]
                  ? content["mission-description"]["text"]
                  : "Description"}
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
                <p className="center-col width-90">
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
                <p className="center-col width-90">
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
                <p className="center-col width-90">
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
                <p className="center-col width-90">
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
    </Layout>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePageData(page, id, data));
    }
  };
};

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

export default connect(null, mapDispatchToProps)(HomePage);
