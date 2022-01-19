import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Form from './Form'

test('<Form /> updates parent state and calls addBlog', () => {
    const addBlog = jest.fn()

    const component = render(
        <Form addBlog={addBlog} />
    )
    const blog = {
        author: 'newAuthor',
        url: 'newUrl',
        title: 'newTitle'
    }

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
        target: { value: blog.title }
    })
    fireEvent.change(urlInput, {
        target: { value: blog.url }
    })
    fireEvent.change(authorInput, {
        target: { value: blog.author }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toEqual(blog )
})