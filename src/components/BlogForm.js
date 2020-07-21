import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  return (
    <div>
      <h2>create blog</h2>
      <form onSubmit={props.handleSubmit}>
        <label>title:
          <input value={props.title} onChange={props.handleTitleChange} /><br />
        </label>
        <label>author:
          <input value={props.author} onChange={props.handleAuthorChange} /><br />
        </label>
        <label>url:
          <input value={props.url} onChange={props.handleUrlChange} /><br />
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm