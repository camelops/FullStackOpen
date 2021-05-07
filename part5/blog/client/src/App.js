import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('some message')

  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div>
        <p>
          {message}
        </p>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      setNotificationMessage(`${username} has successfully logged in.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage(`Wrong credentials entered.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log("logout")
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`"${title}" by ${author} was added.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogURL('')
    })
  }

  const createNewBlog = () => (
    <div> 
      <h2>create new</h2>
      <form onSubmit = {handleCreateBlog}>
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

  const loginForm = () => (
    <div>
      <Notification message={notificationMessage}/>
      <form onSubmit = {handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
          <div>
            <p>
              <Notification message={notificationMessage}/>
              {user.name} is logged in 
              <button onClick={handleLogout}>logout</button>
            </p>
            {createNewBlog()}
            {blogList()}
          </div>
      }
    </div>
  )
}

export default App