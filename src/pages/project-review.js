import React from "react";
import { Link, graphql } from "gatsby"
import { connect } from "react-redux";
import { getProjectsByStatus, updateProjectStatus, loadPageData, deleteSubmission } from "../redux/actions";
import { map } from "lodash";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import OpenIcon from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

import Layout from "../layouts/index";
import ProtectedPage from "../layouts/protected-page"

import 'react-tabs/style/react-tabs.css';


const styles = {
  paper: {
    marginTop: "4rem",
    marginBottom: "4rem",
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectsByStatus: (status) => {
      dispatch(getProjectsByStatus(status));
    },
    updateProjectStatus: (uid, status) => {
      dispatch(updateProjectStatus(uid, status));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    deleteSubmission: (project, uid) => {
      dispatch(deleteSubmission(project, uid));
    },
  };
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    loadingProjects: state.projects.loading,
    pageData: state.page.data,
  };
};

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: "1.4rem"
  },
  body: {
    fontSize: "1.4rem",
    whiteSpace: "pre-wrap"
  }
}))(TableCell);

const ProjectCard = ({ project, uid, updateProjectStatus, deleteSubmission }) => {
  const approveProject = () => {
    updateProjectStatus(uid, "approved");
  };

  const rejectProject = () => {
    updateProjectStatus(uid, "rejected");
  };

  const deleteProject = () => {
    if (typeof window !== "undefined") {
      if (window.confirm("Are you sure you want to delete this project?")) {
        deleteSubmission(project, uid)
      }
    }
  }

  const focusAreas = project.focus ? project.focus.map(focus => focus.label).join(', ') : "None selected";
  const city = project.city ? project.city.label : "None selected";

  return (
    <Paper style={styles.paper}>
      <Table>
        <TableBody>
          <TableRow>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>{project.status}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Date submitted</CustomTableCell>
            <CustomTableCell>{project['submitted-on']}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell>{project.name}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Email</CustomTableCell>
            <CustomTableCell>{project.email}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Position</CustomTableCell>
            <CustomTableCell>{project.position}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Organization</CustomTableCell>
            <CustomTableCell>{project.organization}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Website</CustomTableCell>
            <CustomTableCell>{project.website}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Social media</CustomTableCell>
            <CustomTableCell>{project['social-media']}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Location</CustomTableCell>
            <CustomTableCell>{city}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Areas of focus</CustomTableCell>
            <CustomTableCell>{focusAreas}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Project description</CustomTableCell>
            <CustomTableCell>{project['project-description']}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Project file</CustomTableCell>
            <CustomTableCell>
              <a href={project["project-file-url"]} target="_blank" rel="noopener noreferrer">
                <div style={{ display: "flex", alignItems: "center" }}>
                  Open project file
                  <OpenIcon style={{ marginLeft: "4px" }} />
                </div>
              </a>
            </CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Actions</CustomTableCell>
            <CustomTableCell>
              <Grid container spacing={16}>
                <Grid item>
                  <button
                    className="btn highlight-button-dark btn-small no-margin inner-link btn-flex"
                    variant="raised"
                    color="primary"
                    onClick={deleteProject}
                  >
                    <DeleteIcon />Delete
                  </button>
                </Grid>
                <Grid item>
                  <Link
                    to={`/project-form?project=${uid}/`}
                    className="btn highlight-button-blue btn-small no-margin inner-link btn-flex"
                  >
                    <EditIcon />
                    Edit
                  </Link>
                </Grid>
                <Grid item>
                  <button
                    className="btn highlight-button-dark btn-small no-margin inner-link btn-flex"
                    variant="raised"
                    color="primary"
                    onClick={rejectProject}
                  >
                    <CloseIcon />Reject
                  </button>
                </Grid>
                <Grid item>
                  <button
                    className="btn highlight-button-green-dark btn-small no-margin inner-link btn-flex"
                    variant="raised"
                    color="secondary"
                    onClick={approveProject}
                  >
                    <CheckIcon />
                    Approve
                  </button>
                </Grid>
              </Grid>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

const ProjectReviewTab = props => {
  if (props.loadingProjects) {
    return <div className="loader" />
  }

  return(
    <div>
      {map(props.projects, (project, uid) => {
        return (
          <ProjectCard
            project={project}
            key={uid}
            uid={uid}
            updateProjectStatus={props.updateProjectStatus}
            deleteSubmission={props.deleteSubmission}
          />
        );
      })}
    </div>
  )
}

const ProjectReviewPage = props => {
  const menuItems = props.pageData ? props.pageData.menu : {};

  const loadProjects = (index) => {
    const statuses = ["pending", "approved", "rejected"]
    props.getProjectsByStatus(statuses[index])
    return true
  }

  return (
    <Layout menuItems={menuItems}>
      <ProtectedPage>
      <section className="">
        <div className="container">
          <h2 className="alt-font black-text text-italic font-weight-600 xs-title-extra-large margin-four no-margin-lr no-margin-top">
            Submitted Projects
          </h2>
          <Tabs onSelect={loadProjects}>
            <TabList>
              <Tab>Pending</Tab>
              <Tab>Approved</Tab>
              <Tab>Rejected</Tab>
            </TabList>

            <TabPanel>
              <ProjectReviewTab {...props} />
            </TabPanel>
            <TabPanel>
              <ProjectReviewTab {...props} />
            </TabPanel>
            <TabPanel>
              <ProjectReviewTab {...props} />
            </TabPanel>
          </Tabs>
        </div>
      </section>
      </ProtectedPage>
    </Layout>
  );
};

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.getProjectsByStatus("pending")
    const initialPageData = {
      ...this.props.data.pages,
    };

    this.props.onLoadPageData(initialPageData);
  }

  render() {
    return <ProjectReviewPage {...this.props} />;
  }
}

export const query = graphql`
  query {
    pages(id: { eq: "project-review" }) {
      id
      menu {
        left {
          content {
            anchor
            link
          }
        }
        right {
          content {
            anchor
            link
          }
        }
      }
    }
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
