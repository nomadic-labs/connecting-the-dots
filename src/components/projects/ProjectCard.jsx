import React from "react";
import Grid from "@material-ui/core/Grid";
import OpenIcon from "@material-ui/icons/OpenInNew";
import ensureAbsoluteUrl from "../../utils/ensureAbsoluteUrl.js"

const styles = {
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "2rem"
  }
};

const ProjectCard = ({ project }) => {
  const focusArray = JSON.parse(project.focus)
  const focusAreas = focusArray ? focusArray.map(focus => focus.label).join(', ') : null;

  return (
    <div style={styles.paper} className="service-sub">
      <Grid container>
        <Grid item xs={12}>
          <h3 className="alt-font text-italic font-weight-600 display-inline-block letter-spacing-1 margin-one no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
            {project.project_title}
          </h3>
          <p className="text-medium font-weight-600 letter-spacing-2 text-uppercase black-text margin-one no-margin-lr no-margin-top display-block alt-font">
            {project.organization}
          </p>
          <p className="text-large margin-three no-margin-lr display-block xs-margin-eleven xs-no-margin-lr preserve-newlines">
            {project.project_description}
          </p>

          {
            focusAreas &&
            <p className="text-large margin-three no-margin-lr display-block xs-margin-eleven xs-no-margin-lr">{`Areas of focus: ${focusAreas}`}</p>
          }

          <Grid container spacing={24}>
            {project.project_file_url && (
              <Grid item>
                <a
                  href={project.project_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Open project file
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.website && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {project.website}
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.twitter && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Twitter
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.facebook && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Facebook
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.instagram && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Instagram
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.youtube && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.youtube)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    YouTube
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}

            {project.social_media && (
              <Grid item>
                <a
                  href={ensureAbsoluteUrl(project.social_media)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small no-margin no-padding inner-link"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {project.social_media}
                    <OpenIcon style={{ marginLeft: "4px" }} />
                  </div>
                </a>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectCard;
