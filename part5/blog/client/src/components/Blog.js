import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} 
        <Togglable buttonViewLabel="view" buttonHideLabel="hide">
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </Togglable>
      </div>
    </div>  
  )

}

export default Blog