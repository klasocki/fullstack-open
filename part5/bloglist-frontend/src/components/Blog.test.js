import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "Alex Aleksiewicz",
    url: "blablabla",
    likes: 5
}

test('renders content in short version', () => {
    const component = render(
        <Blog blog={blog} onDelete={null} like={null}/>
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
        'Alex Aleksiewicz'
    )
    const div = component.container.querySelector('.short-blog')
    expect(div).toBeDefined()

    expect(component.container).not.toHaveTextContent(
        'blablabla'
    )
    expect(component.container).not.toHaveTextContent(
        '5'
    )
    expect(component.container).not.toHaveTextContent(
        'Like'
    )
    expect(component.container).not.toHaveTextContent(
        'Remove'
    )

})

test('clicking the button calls event handler once', () => {
    const component = render(
        <Blog blog={blog} onDelete={null} like={null}/>
    )

    const button = component.getByText('Show more')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'blablabla'
    )
    expect(component.container).toHaveTextContent(
        '5'
    )
    expect(component.container).toHaveTextContent(
        'Like'
    )
    expect(component.container).toHaveTextContent(
        'Remove'
    )
})

test('clicking the like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} onDelete={null} like={mockHandler}/>
    )

    const showButton = component.getByText('Show more')
    fireEvent.click(showButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
