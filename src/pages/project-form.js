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
import CitySelector from "../components/CitySelector";
import Select from "react-select";

const menuItems = [{ label: "Home", url: "/" }];

const focusOptions = [
  { label: 'Education', value: 'Education' },
  { label: 'Art & Culture', value: 'Art & Culture' },
  { label: 'Media & Journalism', value: 'Media & Journalism' },
  { label: 'Employment Equity', value: 'Employment Equity' },
  { label: 'Health', value: 'Health' },
  { label: 'Justice', value: 'Justice' },
  { label: 'Economic Prosperity', value: 'Economic Prosperity' },
  { label: 'Civic Engagement', value: 'Civic Engagement' }
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
      const value = event.target ? event.target.value : event;
      onUpdateForm({ [field]: value });
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

                  <div id="city-input">
                    <label htmlFor="city">City</label>
                    <CitySelector
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City Name"
                      handleSelect={onChange("city")}
                      value={formData["city"]}
                      style={{marginBottom: '20px'}}
                      className="big-select alt-font text-medium"
                    />
                  </div>

                  <div id="focus-input">
                    <label htmlFor="Focus">Area of Focus</label>
                    <div className="big-select alt-font text-medium" style={{marginBottom: '20px'}}>
                      <Select
                        id="focus"
                        name="Focus"
                        options={focusOptions}
                        onChange={onChange("focus")}
                        className="big-select"
                        isMulti
                        styles={{
                          input: (base) => ({ ...base, fontFamily: `'Judson', 'Georgia', serif`, verticalAlign: 'middle' }),
                          control: (base, state) => {
                            const baseStyle = {
                              ...base,
                              backgroundColor: "#fff",
                              border: "2px solid rgba(0,0,0,.1)",
                              borderRadius: "none",
                              padding: "10px 14px",
                              boxShadow: "none",
                            };


                            if (state.isFocused) {
                              return {
                                ...baseStyle,
                                border: "2px solid rgba(0,0,0,.5)",
                                "&:hover": {
                                  border: "2px solid rgba(0,0,0,.5)",
                                }
                              }
                            }

                            return baseStyle;
                          }
                        }}
                      />
                    </div>
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
                      maxLength={2000}
                    />
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
