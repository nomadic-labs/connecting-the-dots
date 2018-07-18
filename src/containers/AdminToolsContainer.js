import { connect } from 'react-redux'
import {
  toggleEditing,
  savePage,
  toggleNewPageModal,
  createPage,
  deletePage,
  deploy
} from '../redux/actions'
import AdminTools from '../components/navigation/AdminSection'

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    isEditingPage: state.adminTools.isEditingPage,
    content: state.content,
    pageData: state.pageData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditing: () => {
      dispatch(toggleEditing())
    },
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal())
    },
    createPage: (pageData) => {
      dispatch(createPage(pageData))
    },
    deletePage: (id) => {
      dispatch(deletePage(id))
    },
    savePage: (pageData, content) => {
      dispatch(savePage(pageData, content))
    },
    deploy: () => {
      dispatch(deploy())
    }
  }
}

const AdminToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminTools)

export default AdminToolsContainer;