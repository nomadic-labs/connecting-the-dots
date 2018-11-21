import React from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import {
  updateForm,
  submitProjectForm,
  updatePage,
  loadPageData,
  showNotification
} from "../redux/actions";
import Grid from "@material-ui/core/Grid";

import Layout from "../layouts/index.js";
import Editable from "../components/editable/Editable";
import BackgroundImage from "../components/editable/BackgroundImage";
import PlainTextEditor from "../components/editingTools/PlainTextEditor";
import FileUploadEditor from "../components/editingTools/FileUploadEditor";
import PlaceSelector from "../components/PlaceSelector";
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
    onSubmitProjectForm: (formData, e) => {
      dispatch(submitProjectForm(formData, e));
    },
    onUpdateForm: data => {
      dispatch(updateForm(data));
    },
    showNotification: message => {
      dispatch(showNotification(message))
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
    onUpdateForm,
    showNotification
  }) => {
    const content = pageData ? pageData.content : {};

    const onSave = id => content => {
      onUpdatePageData("project-form", id, content);
    };

    const validate = formData => {
      if (!formData.city) {
        showNotification('Please select a city.')
        return false
      }

      if (!formData.focus) {
        showNotification('Please select at least one focus area.')
        return false
      }

      return true
    }

    const onSubmit = (e) => {
      e.persist();
      e.preventDefault();

      if (!formData.submitted && validate(formData)) {
        return onSubmitProjectForm(formData, e);
      }
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
                <form
                  id="project-submission-form"
                  onSubmit={onSubmit}
                  method="POST"
                  action="https://formspree.io/connectingthedots.bho@gmail.com"
                >
                  <input type="hidden" name="_subject" value="New project submission on Connecting the Dots!" />
                  <input type="text" name="_gotcha" style={{ display: "none" }} />
                  <input type="hidden" name="_next" value="https://www.connectingthedots.ca/?notification=project-form-success" />

                  <fieldset className="margin-four no-margin-lr">
                    <legend>
                      <h3 className="alt-font margin-two no-margin-lr">About you</h3>
                    </legend>

                    <div id="name-input">
                      <label htmlFor="name">Name * </label>
                      <input
                        type="text"
                        name="Name"
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
                        name="Email"
                        id="email"
                        required
                        aria-required
                        placeholder="name@your-project.ca"
                        className="big-input alt-font"
                        onChange={onChange("email")}
                        value={formData["email"] || ""}
                      />
                    </div>

                    <div id="position-input">
                      <label htmlFor="position">
                        Your Role in the Project *
                      </label>
                      <input
                        type="text"
                        name="Position"
                        id="position"
                        placeholder="Program Coordinator"
                        className="big-input alt-font"
                        onChange={onChange("position")}
                        value={formData["position"] || ""}
                        required
                      />
                    </div>
                  </fieldset>

                  <fieldset className="margin-four no-margin-lr">
                    <legend>
                      <h3 className="alt-font margin-two no-margin-lr">About the project</h3>
                    </legend>


                    <div id="project-title-input">
                      <label htmlFor="project-title">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="Project title"
                        id="project-title"
                        placeholder="Project Title"
                        className="big-input alt-font"
                        onChange={onChange("project-title")}
                        value={formData["project-title"] || ""}
                        required
                      />
                    </div>

                    <div id="organization-input">
                      <label htmlFor="organization">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="Organization"
                        id="organization"
                        placeholder="Organization Name"
                        className="big-input alt-font"
                        onChange={onChange("organization")}
                        value={formData["organization"] || ""}
                        required
                      />
                    </div>

                    <div id="city-input">
                      <label htmlFor="city">City *</label>
                      <PlaceSelector
                        placeType="city"
                        type="text"
                        name="City"
                        id="city"
                        placeholder="City Name"
                        handleSelect={onChange("city")}
                        value={formData["city"]}
                        style={{marginBottom: '20px'}}
                        className="big-select alt-font text-medium"
                        required
                      />
                    </div>

                    <div id="city-input">
                      <label htmlFor="city">Address</label>
                      <PlaceSelector
                        placeType="address"
                        type="text"
                        name="Address"
                        id="address"
                        placeholder="Organization address"
                        handleSelect={onChange("address")}
                        value={formData["address"]}
                        style={{marginBottom: '20px'}}
                        className="big-select alt-font text-medium"
                      />
                    </div>

                    <div id="focus-input">
                      <label htmlFor="Focus">Area(s) of Focus *</label>
                      <div className="big-select alt-font text-medium" style={{marginBottom: '20px'}}>
                        <Select
                          id="focus"
                          name="Area(s) of focus"
                          options={focusOptions}
                          onChange={onChange("focus")}
                          className="big-select"
                          isMulti
                          required
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

                    <div id="project-description-input">
                      <label htmlFor="Project description">
                        Describe Your Project (max 2000 characters) *
                      </label>
                      <textarea
                        name="Project description"
                        id="project-description"
                        placeholder="Please provide a brief description of your project."
                        className="big-input alt-font"
                        onChange={onChange("project-description")}
                        value={formData["project-description"] || ""}
                        maxLength={2000}
                        required
                      />
                    </div>

                    <div id="website-input">
                      <label htmlFor="website">Project Website</label>
                      <input
                        type="text"
                        name="Website"
                        id="website"
                        placeholder="https://www.your-project.ca"
                        className="big-input alt-font"
                        onChange={onChange("website")}
                        value={formData["website"] || ""}
                      />
                    </div>

                    <div id="file-upload">
                      <label>Upload a File</label>
                      <FileUploadEditor
                        content={{}}
                        handleChange={onChange("project-file-url")}
                      />
                    </div>

                  </fieldset>

                  <fieldset className="margin-four no-margin-lr">
                    <legend>
                      <h3 className="alt-font margin-two no-margin-lr">Social Media</h3>
                    </legend>

                    <div id="twitter-input">
                      <label htmlFor="twitter">
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="Twitter"
                        id="twitter"
                        placeholder="https://twitter.com/yourproject"
                        className="big-input alt-font"
                        onChange={onChange("twitter")}
                        value={formData["twitter"] || ""}
                      />
                    </div>

                    <div id="facebook-input">
                      <label htmlFor="facebook">
                        Facebook
                      </label>
                      <input
                        type="text"
                        name="Facebook"
                        id="facebook"
                        placeholder="https://www.facebook.com/yourproject"
                        className="big-input alt-font"
                        onChange={onChange("facebook")}
                        value={formData["facebook"] || ""}
                      />
                    </div>

                    <div id="instagram-input">
                      <label htmlFor="instagram">
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="Instagram"
                        id="instagram"
                        placeholder="https://www.instagram.com/yourproject"
                        className="big-input alt-font"
                        onChange={onChange("instagram")}
                        value={formData["instagram"] || ""}
                      />
                    </div>

                    <div id="youtube-input">
                      <label htmlFor="youtube">
                        YouTube
                      </label>
                      <input
                        type="text"
                        name="Youtube"
                        id="youtube"
                        placeholder="https://www.youtube.com/yourproject"
                        className="big-input alt-font"
                        onChange={onChange("youtube")}
                        value={formData["youtube"] || ""}
                      />
                    </div>

                    <div id="social-media-input">
                      <label htmlFor="social-media">
                        Other social media (MySpace, anyone?)
                      </label>
                      <input
                        type="text"
                        name="Other social media"
                        id="social-media"
                        placeholder="https://socialmedia.com/yourproject"
                        className="big-input alt-font"
                        onChange={onChange("social-media")}
                        value={formData["social-media"] || ""}
                      />
                    </div>
                  </fieldset>

                  <button
                    id="project-form-submit"
                    type="submit"
                    className="highlight-button-dark btn btn-medium"
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
