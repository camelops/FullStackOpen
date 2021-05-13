import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="BlogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="BlogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="BlogURL"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button id="submitBlog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm