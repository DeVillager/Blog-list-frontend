import React from 'react'
// import PropTypes from 'prop-types'


const BlogForm = ( props ) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value)
  // }
  // const handleAuthorChange = (event) => {
  //   setAuthor(event.target.value)
  // }
  // const handleUrlChange = (event) => {
  //   setUrl(event.target.value)
  // }

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: title,
  //     author: author,
  //     url: url,
  //   })
  //   setTitle('')
  //   setAuthor('')
  //   setUrl('')
  // }

  // return (
  //   <div className="formDiv">
  //     <h2>create blog</h2>
  //     <form onSubmit={addBlog}>
  //       <label>title:
  //         <input value={title} onChange={handleTitleChange} /><br />
  //       </label>
  //       <label>author:
  //         <input id='author' value={author} onChange={handleAuthorChange} /><br />
  //       </label>
  //       <label>url:
  //         <input value={url} onChange={handleUrlChange} /><br />
  //       </label>
  //       <button type="submit">create</button>
  //     </form>
  //   </div>
  // )
  return (
    <div className="formDiv">
      <h2>create blog</h2>
      <form onSubmit={props.handleSubmit}>
        <label>title:
          <input value={props.title} onChange={props.handleTitleChange} /><br />
        </label>
        <label>author:
          <input id='author' value={props.author} onChange={props.handleAuthorChange} /><br />
        </label>
        <label>url:
          <input value={props.url} onChange={props.handleUrlChange} /><br />
        </label>
        <button type="submit">create</button>
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