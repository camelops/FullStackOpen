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
    // console.log(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)
    // blogService.setToken(JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token)

    let result = window.confirm(`Remove blog '${blogObject.title}' by '${blogObject.author}'`)
    if (result) {
      blogService
        .remove(blogObject.id, blogObject)
        .then(() => {
          updatedBlog()
        })
    }


  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <Togglable buttonViewLabel="view" buttonHideLabel="hide">
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
          <p>{blog.author}</p>
          {blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).username &&
            <button onClick={() => removeBlog(blog)}>remove</button>
          }
        </Togglable>
      </div>
    </div>
  )

}

export default Blog