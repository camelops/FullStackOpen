import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'

import { notify } from './reducers/notificationReducer'
import { initializeBlogs, remove } from './reducers/blogReducer'
import { addBlog, addLike} from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  // const [notification, setNotification] = useState(null)
  const blogFormRef = React.createRef()

  // get the initial list of blogs from the redux store
  const blogs = useSelector(state => {
    return state.blogs
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(notify(`${user.name} welcome back!`, 5, 'success'))
      // notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      dispatch(notify('wrong username/password', 5, 'error'))
      // notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(addBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added!`, 5, 'success'))
    } catch(exception) {
      console.log(exception)
    }
  }


  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(addLike(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(remove(id))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  console.log(blogs)

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App