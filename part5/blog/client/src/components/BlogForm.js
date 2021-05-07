import React from 'react'

const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
  title,
  author,
  url
  }) => {
  return (
    <div> 
      <h2>create new</h2>
      <form onSubmit = {onSubmit}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="BlogTitle"
            onChange={handleTitleChange}
            />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="BlogAuthor"
            onChange={handleAuthorChange}
            />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="BlogURL"
            onChange={handleURLChange}
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm