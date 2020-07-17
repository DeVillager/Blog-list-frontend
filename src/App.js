import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('')
  // const [showAll, setShowBlog] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  // useEffect(() => {
  //   blogs = blogService
  //   .getAll()
  //   .then(setBlogs(blogs))
  // }, [])

  useEffect(() => {
    async function getBlogs() {
      const fetchedBlogs = await blogService.getAll()
      setBlogs(fetchedBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    // else {
    //   setUser(null)
    //   blogService.setToken(null)
    // }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage('Login successful')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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
  )

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = {
        title: title,
        author: author,
        url: url
      }
      const savedBlog = await blogService.create(createdBlog)
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage('Blog added')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
    catch (exception) {
      // console.log(exception.message)
      setErrorMessage('Adding new blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const blogForm = () => (
    // <></>
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>title:</label>
        <input value={title} onChange={handleTitleChange} /><br />
        <label>author:</label>
        <input value={author} onChange={handleAuthorChange} /><br />
        <label>url:</label>
        <input value={url} onChange={handleUrlChange} /><br />
        <button type="submit" onClick={addBlog}>create</button>
      </form>
    </div>
  )


  return (
    <div>
      <h2>Blogs</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={notificationMessage} />
      {/* <ErrorMessage message={errorMessage} /> */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout</button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App