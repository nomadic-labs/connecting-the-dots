import React from "react";
import { connect } from "react-redux";
import { getProjects, updateProjectStatus } from "../redux/actions";
import { map } from "lodash";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import OpenIcon from "@material-ui/icons/OpenInNew";
import { withStyles } from "@material-ui/core/styles";

import Layout from "../layouts/index";
import ProtectedPage from "../layouts/protected-page"

const menuItems = [{ label: "Home", url: "/" }];
const styles = {
  paper: {
    margin: "3rem"
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(getProjects());
    },
    updateProjectStatus: (uid, status) => {
      dispatch(updateProjectStatus(uid, status));
    }
  };
};

const mapStateToProps = state => {
  return {
    projects: state.projects
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
            <CustomTableCell>{project["submitted-on"]}</CustomTableCell>
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
            <CustomTableCell>{project["social-media"]}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Location</CustomTableCell>
            <CustomTableCell>{`${project["city"]}, ${
              project["province"]
            }`}</CustomTableCell>
          </TableRow>

          <TableRow>
            <CustomTableCell>Project description</CustomTableCell>
            <CustomTableCell>{project["project-description"]}</CustomTableCell>
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
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={rejectProject}
                  >
                    <CloseIcon />Reject
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={approveProject}
                  >
                    <CheckIcon />
                    Approve
                  </Button>
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
  return (
    <Layout menuItems={menuItems}>
      <ProtectedPage>
      <section className="">
        <div className="container position-relative">
          <h2 className="alt-font black-text text-italic font-weight-600 xs-title-extra-large">
            Submitted Projects
          </h2>
        </div>
      </section>

      <Grid container justify="center">
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
      </ProtectedPage>
    </Layout>
  );
};

class PageContainer extends React.Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return <ProjectReviewPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
