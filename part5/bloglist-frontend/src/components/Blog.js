import React, {useState} from 'react'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({blog, like, onDelete}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const likeHandler = () => like(blog)
    const deleteHandler = () => onDelete(blog)

    if (!visible) {
        return (
            <div style={blogStyle}>
                {blog.title} | {blog.author}
                <button onClick={toggleVisibility}>Show more</button>
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                <p>{blog.title} <button onClick={toggleVisibility}>Hide</button></p>
                <p>{blog.url}</p>
                <p>Likes: {blog.likes} <button onClick={likeHandler}>Like</button></p>
                <p>{blog.author}</p>
                <button onClick={deleteHandler} style={{display: onDelete ? '': 'none'}}>Remove</button>
            </div>
        )
    }

}

export default Blog