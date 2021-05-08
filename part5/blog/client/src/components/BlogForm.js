import React, {useState} from 'react'

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
            type="text"
            value={title}
            name="BlogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="BlogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="BlogURL"
            onChange={({ target }) => setBlogURL(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm