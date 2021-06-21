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
    dispatch({
      type: 'CREATE',
      data: blog,
    })
  }
}

export const addLike = (data) => {
  return async dispatch => {
    const updatedBlog = await blogService.addLike(data)
    console.log(updatedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog

    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    console.log(id)
    const removedID = await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: removedID
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
    case 'LIKE': {
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: action.data.likes
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog)
    }
    case 'REMOVE': {
      
      return state.filter(blog => blog.id !== action.data)
    }
    default:
      return state
  }
}

export default reducer