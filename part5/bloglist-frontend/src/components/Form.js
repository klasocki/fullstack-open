import React, {useState} from 'react'

const Form = ({addBlog}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newAuthor, setNewAuthor] = useState('')


    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const emptyTextFields = () => {
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    const addBlogHandler = async (event) => {
        event.preventDefault()
        const blog = {
            author: newAuthor,
            url: newUrl,
            title: newTitle
        }
        emptyTextFields()
        await addBlog(blog)
    }

    return (
        <form onSubmit={addBlogHandler}>
            <div>
                title: <input id='title' value={newTitle} onChange={handleTitleChange}/>
            </div>
            <div>author: <input id='author' value={newAuthor} onChange={handleAuthorChange}/></div>
            <div>url: <input id='url' value={newUrl} onChange={handleUrlChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}


export default Form
