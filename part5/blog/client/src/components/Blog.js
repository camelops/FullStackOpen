import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog, updatedBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blogObject) => {

    blogObject.likes += 1

    blogService
      .update(blogObject.id, blogObject)
      .then(() => {
        updatedBlog()
      })
  }

  const removeBlog = (blogObject) => {

    let result = window.confirm(`Remove blog '${blogObject.title}' by '${blogObject.author}'`)
    if (result) {
      blogService
        .remove(blogObject.id, blogObject)
        .then(() => {
          updatedBlog()
        })
    }


  }

  const localUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

  let removeButton = null
  if (localUser) {
    if (localUser.username === blog.user.username) {
      removeButton = <button onClick={() => removeBlog(blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} by {blog.author}
        <Togglable buttonViewLabel="view" buttonHideLabel="hide">
          <p>{blog.url}</p>
          <p className='likes'>likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
          {removeButton}
        </Togglable>
      </div>
    </div>
  )

}

export default Blog