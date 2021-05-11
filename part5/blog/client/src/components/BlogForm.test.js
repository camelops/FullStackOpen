import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<Blog/>', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={mockHandler}> </BlogForm>
    )
  })

  test('filling out blog form', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, { target: { value: 'Haley Whitman' } })
    fireEvent.change(title, { target: { value: 'Greatest Book' } })
    fireEvent.change(url, { target: { value: 'www.goodbooks.com' } })

    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls[0][0].author).toBe('Haley Whitman')
    expect(mockHandler.mock.calls[0][0].title).toBe('Greatest Book')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.goodbooks.com')
  })


})