import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog, updatedBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blogObject) => {
    console.log(blogObject)

    blogObject.likes += 1

    blogService
    .update(blogObject.id, blogObject)
    .then(returnedBlog => {
      updatedBlog()
    })
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} 
        <Togglable buttonViewLabel="view" buttonHideLabel="hide">
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
          <p>{blog.author}</p>
        </Togglable>
      </div>
    </div>  
  )

}

export default Blog