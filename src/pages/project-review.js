import React from "react";
import { connect } from "react-redux";
import { getProjects, updateProjectStatus, loadPageData } from "../redux/actions";
import { map } from "lodash";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import OpenIcon from "@material-ui/icons/OpenInNew";
import { withStyles } from "@material-ui/core/styles";

import Layout from "../layouts/index";
import ProtectedPage from "../layouts/protected-page"

const menuItems = [{ label: "Home", url: "/" }];
const styles = {
  paper: {
    marginTop: "4rem",
    marginBottom: "4rem",
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(getProjects());
    },
    updateProjectStatus: (uid, status) => {
      dispatch(updateProjectStatus(uid, status));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    projects: state.projects,
    pageData: state.page.data,
  };
};

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: "1.4rem"
  },
  body: {
    fontSize: "1.4rem"
  }
}))(TableCell);

const ProjectCard = ({ project, uid, updateProjectStatus }) => {
  const approveProject = () => {
    updateProjectStatus(uid, "approved");
  };

  const rejectProject = () => {
    updateProjectStatus(uid, "rejected");
  };

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

const ProjectReviewPage = props => {
  const menuItems = props.pageData ? props.pageData.menu : {};
  return (
    <Layout menuItems={menuItems}>
      <ProtectedPage>
      <section className="">
        <div className="container">
          <h2 className="alt-font black-text text-italic font-weight-600 xs-title-extra-large">
            Submitted Projects
          </h2>
          <div>
            {map(props.projects, (project, uid) => {
              return (
                <ProjectCard
                  project={project}
                  key={uid}
                  uid={uid}
                  updateProjectStatus={props.updateProjectStatus}
                />
              );
            })}
          </div>
        </div>
      </section>
      </ProtectedPage>
    </Layout>
  );
};

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.getProjects();
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
