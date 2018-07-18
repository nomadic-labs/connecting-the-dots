import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { connect } from "react-redux";
import {
  updatePageData
} from "../redux/actions";

import Layout from "../layouts/index.js";
import BasicPage from "../templates/basicPage.jsx";
import BackgroundImage from "../components/editable/BackgroundImage";
import Editable from "../components/editable/Editable";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";

const HomePage = ({ data, onUpdatePageData }) => {
  const pageData = { ...data.pages, content: JSON.parse(data.pages.content) };
  const content = JSON.parse(data.pages.content);
  console.log("pageData", pageData);

  const onSave = id => content => {
    onUpdatePageData('home', id, content)
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
                        content={
                          content["landing-title"]
                            ? content["landing-title"]
                            : { text: "Title" }
                        }
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
                        content={
                          content["landing-subtitle"]
                            ? content["landing-subtitle"]
                            : { text: "Subtitle" }
                        }
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
    </Layout>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePageData(page, id, data));
    },
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

export default connect(null, mapDispatchToProps)(HomePage);
