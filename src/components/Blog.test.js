import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

let component
let createdBlog = {
  title: 'testTitle',
  author: 'testAuthor',
  url: 'testUrl'
}

beforeEach(() => {
  cleanup()
})

test('renders title and author', () => {
  component = render(<Blog blog={createdBlog} />)
  component.debug()
  expect(component.container).toHaveTextContent('testTitle')
  expect(component.container).toHaveTextContent('testAuthor')
})

test('not likes or url in view by default', () => {
  component = render(<Blog blog={createdBlog} />)
  const initialView = component.container.querySelector('.initialView')
  // console.log(prettyDOM(initialView))
  expect(initialView).not.toHaveTextContent('testUrl')
  expect(initialView).not.toHaveTextContent('likes')
})

test('at start the children are not displayed', () => {
  component = render(<Blog blog={createdBlog} />)
  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('clicking the view shows url and likes', () => {
  component = render(<Blog blog={createdBlog} />)
  const button = component.getByText('view')
  fireEvent.click(button)
  component.debug()
  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('testUrl')
  expect(div).toHaveTextContent('likes')
})

test('clicking the like button triggers event handler twice', () => {
  const mockHandler = jest.fn()
  const component = render(<Blog blog={createdBlog} addLike={mockHandler} />)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  component.debug()
  expect(mockHandler.mock.calls).toHaveLength(2)
})