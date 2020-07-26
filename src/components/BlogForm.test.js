import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test.only('<BlogForm /> updates parent state and calls onSubmit', () => {

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={createBlog} />
  )

  const authorInput = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: 'testing of forms could be easier' }
  })
  userEvent.type(authorInput, 'JavaScript')
  // component.debug()
  fireEvent.submit(form)

  // console.log(createBlog.mock.calls[0][0].title)
  // console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  // expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
})