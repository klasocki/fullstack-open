import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Form from './components/Form'
import Togglable from './components/Togglable'

import Notification from './components/Message'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const blogFormRef = useRef()

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

    const addBlog = async (blogToAdd) => {
        try {
            const blog = await blogService.add(blogToAdd)
            setBlogs(blogs.concat(blog))
            notifyOfSuccess('New blog created')
            blogFormRef.current.toggleVisibility()
        } catch (error) {
            console.log(error)
            notifyOfError(error)
        }
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
        <Togglable buttonLabel={'Login'}>
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
        </Togglable>
    )

    const blogList = () => (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={logOut}>Log out</button>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} like={like} onDelete={(blog.user.username === user.username) ? deleteBlog: null}/>
                )}
            <Togglable buttonLabel={'Create new blog'} ref={blogFormRef}>
                <Form addBlog={addBlog}/>
            </Togglable>
        </div>
    )

    const like = async (blog) => {
        const newBlog = {...blog, likes: blog.likes + 1}
        await blogService.update(newBlog)
        setBlogs(blogs.filter(b => b.id !== newBlog.id).concat(newBlog))
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} ?`)) {
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
            notifyOfSuccess('Blog deleted')
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={errorMessage} type={'error'}/>
            <Notification message={successMessage} type={'success'}/>
            {user === null && loginForm()}
            {user !== null && blogList()}

        </div>
    )
}


export default App