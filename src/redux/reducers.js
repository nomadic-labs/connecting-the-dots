
export const adminTools = (state={}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return { ...state, isLoggedIn: true, user: action.user }
    case 'LOCK_FAILURE':
      return { ...state, isLoggedIn: false, error: action.err }
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false, isEditingPage: false }
    case 'TOGGLE_EDITING':
      return { ...state, isEditingPage: !state.isEditingPage }
    case 'TOGGLE_REGISTRATION_MODAL':
      return { ...state, showRegistrationModal: !state.showRegistrationModal }
    default:
      return state
  }
}

export const notifications = (state={}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.message,
        color: action.color
      }
    case 'CLOSE_NOTIFICATION':
      return {
          ...state,
          message: null,
          color: null
      }
    default:
      return state
  }
}

export const navigation = (state={}, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        showMenu: true
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        showMenu: false
      }
    default:
      return state
  }
}

export const page = (state={}, action) => {
  switch (action.type) {
    case 'LOAD_PAGE_DATA':
      return {
        ...state,
        data: action.data
      }
    case 'UPDATE_PAGE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.contentId]: action.content
          }
        }
      }
    case 'UPDATE_PAGE_CONTENT':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.location]: {
              ...state.data.content[action.location],
              ...action.content
            }
          }
        }
      }
    case 'SET_PAGE_CONTENT':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.location]: action.content
          }
        }
      }

    case 'UPDATE_MENU_DATA':
      let newContentArray = [...state.data.menu[action.location]]
      newContentArray[action.index]['content'] = action.content
      return {
        ...state,
        data: {
          ...state.data,
          menu: {
            ...state.data.menu,
            [action.location]: newContentArray
          }
        }
      }
    default:
      return state
  }
}

export const projectForm = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECT_FORM':
      return {
        ...state,
        ...action.data
      }
    case 'SUBMIT_PROJECT_FORM_SUCCESS':
      return {
        ...state,
        submitted: true,
      }
    default:
      return state
  }
}

export const projects = (state={ loading: false, projects: {} }, action) => {
  switch (action.type) {
    case 'LOADING_PROJECTS':
      return {
        ...state,
        loading: true
      }
    case 'UPDATE_PROJECTS':
      return {
        projects: action.projects,
        loading: false
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
            ...state[action.projectId],
            ...action.projectData
          }
        }
      }
    default:
      return state
  }
}

export const appReducers = (state = {}, action) => {
  return {
    notifications: notifications(state.notifications, action),
    adminTools: adminTools(state.adminTools, action),
    navigation: navigation(state.navigation, action),
    page: page(state.page, action),
    projectForm: projectForm(state.projectForm, action),
    projects: projects(state.projects, action),
  }
}

