import React from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import { updateForm, submitProjectForm, updatePage, loadPageData } from "../redux/actions";
import Grid from "@material-ui/core/Grid";

import Layout from "../layouts/index.js";
import Editable from "../components/editable/Editable";
import BackgroundImage from "../components/editable/BackgroundImage";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import FileUploadEditor from "../components/editingTools/FileUploadEditor";

const menuItems = [
  { label: "Home", url: "/" },
]

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    onSubmitProjectForm: formData => {
      dispatch(submitProjectForm(formData))
    },
    onUpdateForm: data => {
      dispatch(updateForm(data))
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    formData: state.projectForm
  };
};

const ProjectForm = connect(mapStateToProps, mapDispatchToProps)(
  ({ pageData, formData, onUpdatePageData, onSubmitProjectForm, onUpdateForm }) => {
    const content = pageData ? pageData.content : {};

    const onSave = id => content => {
      onUpdatePageData("project-form", id, content);
    };

    const onSubmit = e => {
      e.preventDefault();
      onSubmitProjectForm(formData);
    }

    const onChange = field => event => {
      onUpdateForm({ [field]: event.target.value })
    }

    return (
      <Layout menuItems={menuItems}>
        <section className="no-padding">
          <BackgroundImage
              content={content["project-form-background"]}
              handleSave={onSave("project-form-background")}
            >
          <div className="opacity-full bg-deep-blue3" />
          <div className="container half-screen position-relative">
            <div className="slider-typography text-center">
              <div className="slider-text-middle-main md-margin-eleven sm-margin-three xs-margin-thirteen">
                <div className="slider-text-middle slider-typography-option1">
                  <h2 className="alt-font white-text text-italic font-weight-600 xs-title-extra-large">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["project-form-title"]}
                      handleSave={onSave("project-form-title")}
                    >
                      {content["project-form-title"]
                        ? content["project-form-title"]["text"]
                        : "Title"}
                    </Editable>
                  </h2>
                  <div className="alt-font title-small xs-text-large white-text text-uppercase margin-one no-margin-bottom no-margin-lr display-block">
                    <Editable
                      editor={PlainTextEditor}
                      content={content["project-form-description"]}
                      handleSave={onSave("project-form-description")}
                    >
                      {content["project-form-description"]
                        ? content["project-form-description"]["text"]
                        : "Subtitle"}
                    </Editable>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </BackgroundImage>
        </section>

        <section id="form" className="wow fadeIn work-with-us">
          <div className="container">
            <Grid container justify="center">
              <Grid item xs={12} md={8} className="margin-nine no-margin-bottom no-margin-lr">
                <form
                  id="project-submission-form"
                >
                  <div id="success" className="no-margin-lr" />
                  <input
                    type="text"
                    name="Name"
                    id="name"
                    placeholder="* YOUR NAME"
                    className="big-input alt-font"
                    required
                    onChange={onChange('name')}
                  />
                  <input
                    type="email"
                    name="_replyto"
                    id="email"
                    required
                    placeholder="* YOUR EMAIL"
                    className="big-input alt-font"
                    onChange={onChange('email')}
                  />
                  <input
                    type="text"
                    name="Social media handle"
                    id="social-media"
                    placeholder="SOCIAL MEDIA HANDLE"
                    className="big-input alt-font"
                    onChange={onChange('social-media')}
                  />
                  <input
                    type="text"
                    name="Organization"
                    id="organization"
                    placeholder="ORGANIZATION"
                    className="big-input alt-font"
                    onChange={onChange('organization')}
                  />
                  <input
                    type="text"
                    name="Position"
                    id="position"
                    placeholder="POSITION"
                    className="big-input alt-font"
                    onChange={onChange('position')}
                  />
                  <input
                    type="text"
                    name="Website"
                    id="website"
                    placeholder="WEBSITE"
                    className="big-input alt-font"
                    onChange={onChange('website')}
                  />
                  <input
                    type="text"
                    name="City"
                    id="city"
                    placeholder="CITY"
                    className="big-input alt-font"
                    onChange={onChange('city')}
                  />
                  <div className="select-style big-select alt-font">
                    <select id="province" name="Province" onChange={onChange('province')} value={formData.province}>
                      <option>PROVINCE/TERRITORY</option>
                      <option value="AB">AB</option>
                      <option value="BC">BC</option>
                      <option value="MB">MB</option>
                      <option value="NB">NB</option>
                      <option value="NS">NS</option>
                      <option value="NV">NV</option>
                      <option value="NWT">NWT</option>
                      <option value="NFD&LB">NFD&LB</option>
                      <option value="ON">ON</option>
                      <option value="PEI">PEI</option>
                      <option value="QC">QC</option>
                      <option value="SK">SK</option>
                      <option value="YK">YK</option>
                    </select>
                  </div>
                  <textarea
                    name="Project description"
                    id="project-description"
                    placeholder="DESCRIBE YOUR PROJECT"
                    className="big-input alt-font"
                    onChange={onChange('project-description')}
                  />
                  <FileUploadEditor content={{}} handleChange={onChange('project-file-url')} />
                  <input
                    type="hidden"
                    name="_next"
                    value="https://connectingthedots.ca/"
                  />
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                  />
                  <button
                    id="project-form-submit"
                    type="submit"
                    className="highlight-button-dark btn btn-medium"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </form>
              </Grid>
            </Grid>
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
    return <ProjectForm />;
  }
}

export const query = graphql`
  query {
    pages(id: { eq: "project-form" }) {
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
