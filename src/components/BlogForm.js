import React from 'react'
// import PropTypes from 'prop-types'


const BlogForm = ( props ) => {
  return (
    <div className="formDiv">
      <h2>create blog</h2>
      <form onSubmit={props.handleSubmit}>
        <label>title:
          <input id='title' value={props.title} onChange={props.handleTitleChange} /><br />
        </label>
        <label>author:
          <input id='author' value={props.author} onChange={props.handleAuthorChange} /><br />
        </label>
        <label>url:
          <input id='url' value={props.url} onChange={props.handleUrlChange} /><br />
        </label>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   handleTitleChange: PropTypes.func.isRequired,
//   handleAuthorChange: PropTypes.func.isRequired,
//   handleUrlChange: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// }

export default BlogForm