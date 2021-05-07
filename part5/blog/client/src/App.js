import React, { useState, useEffect, useRef} from 'react'
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

  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogURL] = useState('')

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const blogFormRef = useRef()

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
      setNotificationMessage(`Wrong credentials entered.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log("logout")
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogFormRef.current.toggleVisibility()

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

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm
            author={author}
            title={title}
            url={url}
            handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
            handleTitleChange={({ target }) => setBlogTitle(target.value)}
            handleURLChange={({ target }) => setBlogURL(target.value)}
            // handleSubmit={handleCreateBlog}
            onSubmit={handleCreateBlog}
          />
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