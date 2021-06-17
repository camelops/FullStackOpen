import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.create(data)
    console.log(blog)
    dispatch({
      type: 'CREATE',
      data: blog,
    })
  }
}

export const getBlogs = (data) => {
  return async dispatch => {
    dispatch({
      type: 'GET_BLOGS'
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'CREATE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export default reducer