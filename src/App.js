import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('')
  // const [showAll, setShowBlog] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [blog, setBlog] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  // const [infoVisible, setInfoVisible] = useState(false)

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('userid in app', user.username)
      setUser(user)
      blogService.setToken(user.token)
    }
    // else {
    //   setUser(null)
    //   blogService.setToken(null)
    // }
  }, [])

  const getBlogs = async () => {
    const fetchedBlogs = await blogService.getAll()
    fetchedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(fetchedBlogs)
    return fetchedBlogs
  }

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

  const loginForm = () => {
    return (
      <div>
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
      </div>
    )
  }

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
      setCreateBlogVisible(false)
      setNotificationMessage('Blog added')
      setTimeout(() => { setNotificationMessage(null) }, 5000)
      return savedBlog
    }
    catch (exception) {
      // console.log(exception.message)
      setErrorMessage('Adding new blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  // const addBlog = async (blogObject) => {
  //   const savedBlog = await blogService.create(blogObject)
  //   setBlogs(blogs.concat(savedBlog))
  //   return savedBlog
  // }

  const deleteBlog = async (blog) => {
    // event.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      await blogService.remove(id)
      setBlogs(blogs.filter(item => item.id !== id))
    }
  }

  const addLike = async (blog) => {
    // event.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const savedBlog = await blogService.update(blog.id, updatedBlog)
    getBlogs()
    // const allBlogs = await blogService.getAll()
    // setBlogs(allBlogs)
    return (savedBlog)
  }


  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value)
  // }
  // const handleAuthorChange = (event) => {
  //   setAuthor(event.target.value)
  // }
  // const handleUrlChange = (event) => {
  //   setUrl(event.target.value)
  // }

  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            // createBlog={addBlog}
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={notificationMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout</button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={() => deleteBlog(blog)}
              addLike={() => addLike(blog)}
            />
          )}
        </div>
      }

    </div>
  )
}

export default App