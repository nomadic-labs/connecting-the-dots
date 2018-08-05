import React from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import {
  updateForm,
  submitProjectForm,
  updatePage,
  loadPageData
} from "../redux/actions";
import Grid from "@material-ui/core/Grid";

import Layout from "../layouts/index.js";
import Editable from "../components/editable/Editable";
import BackgroundImage from "../components/editable/BackgroundImage";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import FileUploadEditor from "../components/editingTools/FileUploadEditor";

const menuItems = [{ label: "Home", url: "/" }];

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    onSubmitProjectForm: formData => {
      dispatch(submitProjectForm(formData));
    },
    onUpdateForm: data => {
      dispatch(updateForm(data));
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
  ({
    pageData,
    formData,
    onUpdatePageData,
    onSubmitProjectForm,
    onUpdateForm
  }) => {
    const content = pageData ? pageData.content : {};

    const onSave = id => content => {
      onUpdatePageData("project-form", id, content);
    };

    const onSubmit = e => {
      e.preventDefault();
      onSubmitProjectForm(formData);
    };

    const onChange = field => event => {
      onUpdateForm({ [field]: event.target.value });
    };

    return (
      <Layout menuItems={menuItems}>
        <section className="no-padding">
          <BackgroundImage
            content={content["project-form-background"]}
            handleSave={onSave("project-form-background")}
            overlay={true}
          >
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
                    <div className="alt-font title-small xs-text-large white-text margin-one no-margin-bottom no-margin-lr display-block">
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
              <Grid
                item
                xs={12}
                md={8}
                className="margin-nine no-margin-bottom no-margin-lr"
              >
                <form id="project-submission-form">
                  <div id="success" className="no-margin-lr" />

                  <div id="name-input">
                    <label htmlFor="name">Your Name * </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Firstname Lastname"
                      className="big-input alt-font"
                      required
                      aria-required
                      onChange={onChange("name")}
                      value={formData["name"] || ""}
                    />
                  </div>

                  <div id="email-input">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      aria-required
                      placeholder="name@your-project.ca"
                      className="big-input alt-font"
                      onChange={onChange("email")}
                      value={formData["email"] || ""}
                    />
                  </div>

                  <div id="social-media-input">
                    <label htmlFor="social-media">
                      Social Media Link (Facebook, Twitter, Instagram, etc.)
                    </label>
                    <input
                      type="text"
                      name="social-media"
                      id="social-media"
                      placeholder="https://socialmedia.com/yourproject"
                      className="big-input alt-font"
                      onChange={onChange("social-media")}
                      value={formData["social-media"] || ""}
                    />
                  </div>

                  <div id="organization-input">
                    <label htmlFor="organization">
                      Your Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      placeholder="Organization Name"
                      className="big-input alt-font"
                      onChange={onChange("organization")}
                      value={formData["organization"] || ""}
                    />
                  </div>

                  <div id="project-title-input">
                    <label htmlFor="project-title">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="project-title"
                      id="project-title"
                      placeholder="Project Title"
                      className="big-input alt-font"
                      onChange={onChange("project-title")}
                      value={formData["project-title"] || ""}
                    />
                  </div>

                  <div id="position-input">
                    <label htmlFor="position">
                      Your Role in the Project
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      placeholder="Program Coordinator"
                      className="big-input alt-font"
                      onChange={onChange("position")}
                      value={formData["position"] || ""}
                    />
                  </div>

                  <div id="website-input">
                    <label htmlFor="website">Project Website</label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      placeholder="https://www.your-project.ca"
                      className="big-input alt-font"
                      onChange={onChange("website")}
                      value={formData["website"] || ""}
                    />
                  </div>

                  <div id="city-input">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City Name"
                      className="big-input alt-font"
                      onChange={onChange("city")}
                      value={formData["city"] || ""}
                    />
                  </div>

                  <div id="province-input">
                    <label htmlFor="Province">Province/Territory</label>
                    <div className="select-style big-select alt-font">
                      <select
                        id="province"
                        name="province"
                        onChange={onChange("province")}
                        value={formData.province}
                        className="big-select"
                      >
                        <option>Select Province/Territory</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NV">Nunavut</option>
                        <option value="NWT">Northwest Territories</option>
                        <option value="NFD&LB">
                          Newfoundland and Labrador
                        </option>
                        <option value="ON">Ontario</option>
                        <option value="PEI">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YK">Yukon</option>
                      </select>
                    </div>
                  </div>

                  <div id="project-description-input">
                    <label htmlFor="Project description">
                      Describe Your Project
                    </label>
                    <textarea
                      name="project-description"
                      id="project-description"
                      placeholder="Please provide a brief description of your project (max 2000 characters)."
                      className="big-input alt-font"
                      onChange={onChange("project-description")}
                      value={formData["project-description"] || ""}
                      maxlength={2000}
                    />
                  </div>

                  <div id="focus-input">
                    <label htmlFor="Focus">Area of Focus</label>
                    <div className="select-style big-select alt-font">
                      <select
                        id="focus"
                        aria-labelledby="Area of Focus"
                        name="Focus"
                        onChange={onChange("focus")}
                        value={formData.focus}
                        className="big-select"
                      >
                        <option value="Education">{`Education`}</option>
                        <option value="Art & Culture">{`Art & Culture`}</option>
                        <option value="Media & Journalism">{`Media & Journalism`}</option>
                        <option value="Employment Equity">{`Employment Equity`}</option>
                        <option value="Health">{`Health`}</option>
                        <option value="Justice">{`Justice`}</option>
                        <option value="Economic Prosperity">{`Economic Prosperity`}</option>
                        <option value="Civic Engagement">{`Civic Engagement`}</option>
                      </select>
                    </div>
                  </div>

                  <div id="file-upload">
                    <label>Upload a File</label>
                    <FileUploadEditor
                      content={{}}
                      handleChange={onChange("project-file-url")}
                    />
                  </div>

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
