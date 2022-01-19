import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from "./components/Form";
import Notification from "./components/Message";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.add({
                author: newAuthor,
                url: newUrl,
                title: newTitle
            })
            setBlogs(blogs.concat(blog))
            notifyOfSuccess('New blog created')
        } catch (error) {
            console.log(error.response.data.error)
            notifyOfError(error.response.data.error)
        }

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    const notifyOfSuccess = (msg) => {
        setSuccessMessage(msg)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }
    const notifyOfError = (msg) => {
        setErrorMessage(msg)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({username, password,})
            setUser(user)
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        } catch (exception) {
            notifyOfError('Wrong credentials')
        }
    }

    const logOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setUsername('')
        setPassword('')
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const blogList = () => (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={logOut}>Log out</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
            <Form newUrl={newUrl} addBlog={addBlog} handleAuthorChange={handleAuthorChange}
                  handleTitleChange={handleTitleChange} handleUrlChange={handleUrlChange}
                  newAuthor={newAuthor} newTitle={newTitle}/>
        </div>
    )


    return (
        <div>
            <h2>blogs</h2>
            <Notification message={errorMessage} type={"error"}/>
            <Notification message={successMessage} type={"success"}/>
            {user === null && loginForm()}
            {user !== null && blogList()}

        </div>
    )
}

export default App