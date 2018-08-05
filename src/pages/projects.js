import React from 'react';
// import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";
import { map } from 'lodash';
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Layout from "../layouts/index.js";
import mapbox from "../utils/mapbox";
import ProjectCard from '../components/projects/ProjectCard'

import '../assets/css/mapbox.css';

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.projectsByCity = {};
    this.props.projects.map(node => {
      const project = node.node;
      if (this.projectsByCity[project.city.city]) {
        this.projectsByCity[project.city.city].projects.push(project);
      } else {
        this.projectsByCity[project.city.city] = {
          location: project.city,
          projects: [project]
        }
      }
    })
  }

  componentDidMount() {
    this.map = new mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-99, 52],
      zoom: 3.0
    })

    console.log(this.projectsByCity);
    this.markers = map(this.projectsByCity, (data, city) => {
      const popup = new mapbox.Popup()
        .setHTML(`<a href='#${city}'>See projects from ${city}</a>`);

      const marker = new mapbox.Marker()
        .setLngLat([data.location.longitude, data.location.latitude])
        .setPopup(popup)
        .addTo(this.map)

      return marker
    })

  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>
            Connecting the Dots | Projects
          </title>
        </Helmet>
        <div className="mabox-map" style={{ height: '50vh', width: '100vw', minHeight: '300px' }}>
          <div ref={el => this.mapContainer = el} />
        </div>
        <section id="project-list">
          <Grid container justify="center">
            <Grid item>
              <h1 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr no-margin-top xs-margin-eleven xs-no-margin-lr xs-no-margin-top">All Projects</h1>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              {
                map(this.projectsByCity, (data, city) => {
                  return(
                    <div id={city} key={city}>
                      <h2 className="alt-font text-italic font-weight-600 title-thick-underline border-color-fast-yellow display-inline-block letter-spacing-1 margin-seven no-margin-lr xs-margin-eleven xs-no-margin-lr xs-no-margin-top">{city}</h2>
                      {
                        data.projects.map(project => <ProjectCard project={project} key={project.id} />)
                      }
                    </div>
                  )
                })
              }
            </Grid>
          </Grid>
        </section>
      </Layout>
    )
  }
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
      <ProjectsPage { ...props} projects={data.allProjects.edges} />
    )}
  />
);

export default ProjectsPageContainer;
