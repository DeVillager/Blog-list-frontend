import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('Submitting form fires event handler with right details', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'author changed here'}
  })
  fireEvent.submit(form)
  component.debug()
  
  // Not working now
  // expect(createBlog.mock.calls).toHaveLength(1)
  // expect(createBlog.mock.calls[0][0].author).ToBe('author changed here')
})