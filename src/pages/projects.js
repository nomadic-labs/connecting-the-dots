import React from 'react';
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";

const ProjectsPage = props => {
  return <div>{JSON.stringify(props.projects)}</div>
}


const ProjectsPageContainer = props => (
  <StaticQuery
    query={graphql`
      query {
        allProjects {
          edges {
            node {
              id
              name
              position
              organization
              website
              city
              province
              project_title
              project_description
              project_file_url
              social_media
            }
          }
        }
      }
    `}
    render={data => (
      <ProjectsPage { ...props} projects={data.allProjects.edges} />
    )}
  />
);

export default ProjectsPageContainer;
