import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newObject => {
    const config = {headers: {Authorization: token},}
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (newObject) => {
    const newBlog = {
        likes: newObject.likes,
        author: newObject.author,
        title: newObject.title,
        url: newObject.url
    }
    const config = {headers: {Authorization: token},}
    const request = axios.put(`${baseUrl}/${newObject.id}`, newBlog, config)
    return request.then(response => response.data)
}


const deleteBlog = (id) => {
    const config = {headers: {Authorization: token},}
    const request = axios.put(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default {getAll, add, setToken, update, deleteBlog}