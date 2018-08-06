import React from "react";
// import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";
import { map } from "lodash";
import Helmet from "react-helmet";
import Layout from "../layouts/index.js";
import mapbox from "../utils/mapbox";
import ProjectCard from "../components/projects/ProjectCard";

import "../assets/css/mapbox.css";

const menuItems = [{ label: "Home", url: "/" }];

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectsByCity = {};
    this.props.projects.forEach(node => {
      const project = node.node;
      if (this.projectsByCity[project.city.city]) {
        this.projectsByCity[project.city.city].projects.push(project);
      } else {
        this.projectsByCity[project.city.city] = {
          location: project.city,
          projects: [project]
        };
      }
    });
  }

  componentDidMount() {
    this.map = new mapbox.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-90, 54],
      zoom: 3.0
    });

    console.log(this.projectsByCity);
    this.markers = map(this.projectsByCity, (data, city) => {
      const popup = new mapbox.Popup().setHTML(
        `<a href='#${city}'>See projects from ${city}</a>`
      );

      const marker = new mapbox.Marker({ color: "#FCB239" }) // yellow
        .setLngLat([data.location.longitude, data.location.latitude])
        .setPopup(popup)
        .addTo(this.map);

      return marker;
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <Layout menuItems={menuItems}>
        <Helmet>
          <title>Connecting the Dots | Projects</title>
        </Helmet>
        <section id="all-projects" className="bg-black">
          <div className="container">
            <h1 className="alt-font white-text text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr xs-margin-eleven xs-no-margin-lr">
              Connecting the Dots Projects
            </h1>
            <div
              className="mabox-map"
              style={{ height: "50vh", width: "100%", minHeight: "300px" }}
            >
              <div ref={el => (this.mapContainer = el)} />
            </div>
          </div>
        </section>
        {map(this.projectsByCity, (data, city) => {
          return (
            <section
              id={city}
              key={city}
              className="wow fadeIn padding-seven no-padding-lr border-top animated bg-gray"
            >
              <div className="container">
                <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr xs-margin-eleven xs-no-margin-lr xs-no-margin-top">
                  {city}
                </h2>
                {data.projects.map(project => (
                  <ProjectCard project={project} key={project.id} />
                ))}
              </div>
            </section>
          );
        })}
      </Layout>
    );
  }
}

const ProjectsPageContainer = props => (
  <StaticQuery
    query={graphql`
      query {
        allProjects(filter: { status: { eq: "approved" } }) {
          edges {
            node {
              id
              name
              position
              organization
              website
              province
              project_title
              project_description
              project_file_url
              social_media
              focus
              city {
                city
                province
                latitude
                longitude
                place_id
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ProjectsPage {...props} projects={data.allProjects.edges} />
    )}
  />
);

export default ProjectsPageContainer;
