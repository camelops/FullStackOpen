import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Haley',
    likes: 5,
    url: 'www.test.com',
    user: {
      username: 'test',
      name: 'Test User',
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })


  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'Haley'
    )
  })

  test('Does not render likes/url by default', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button, likes/url are displayed.', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Clicking like button twice', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const mockHandler = jest.fn()

    const likeButton = component.getByText('like')
    likeButton.onclick = mockHandler
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
