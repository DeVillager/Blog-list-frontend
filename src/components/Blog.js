import React, { useState, useEffect } from 'react'

const Blog = ({ blog, deleteBlog, addLike, }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 10
  }

  const [infoVisible, setInfoVisible] = useState(false)
  const [loggedUser, setLoggedUser] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  const showIfLoggedUser = { display: loggedUser ? '' : 'none' }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('userid ', user.username)
      setLoggedUser(user.username === blog.user.username)
    }
  }, [])

  const show = () => {
    // event.preventDefault()
    setInfoVisible(true)
    // if(showContent) showContent()
  }

  return (
    <div className='blog' style={blogStyle}>
      <div style={hideWhenVisible} className="initialView">
        <p>{blog.title} {blog.author}</p>
        {/* <button onClick={() => setInfoVisible(true)}>view</button> */}
        <button id='showButton' onClick={() => show()}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <ul >
          <li>{blog.title}</li>
          <li>{blog.url}</li>
          <li id='likes'>likes {blog.likes}
            <button id='likeButton' onClick={() => addLike(blog)}>like</button>
          </li>
          <li>{blog.author}</li>
        </ul>
        <button onClick={() => setInfoVisible(false)}>hide</button>
        <button id='deleteButton' style={showIfLoggedUser} onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

export default Blog
