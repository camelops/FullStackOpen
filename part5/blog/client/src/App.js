import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('some message')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a, b) {
        return a.likes - b.likes
      })

      setBlogs( blogs )
    })
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
        {message}
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
      setNotificationMessage('Wrong credentials entered.')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`"${returnedBlog.title}" by ${returnedBlog.author} was added.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      // clear the inputs
      })
  }



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

  const blogList = () => {

    const updatedBlog = () => {
      blogService.getAll().then(blogs => {
        blogs.sort(function (a, b) {
          return a.likes - b.likes
        })

        setBlogs( blogs )
      })
    }

    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updatedBlog={updatedBlog} />
        )}
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonViewLabel="create blog" buttonHideLabel="cancel" ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <Notification message={notificationMessage}/>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App