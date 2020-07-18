import React from 'react'

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

export default BlogForm