const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor, tokenExtractor} = require("../utils/middleware");

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = request.user
    if (!user) {
        return response.status(400).json({error: 'User not found'})
    }
    if (!body.title ) {
        return response.status(400).json({error: 'Title missing'})
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {return response.status(204).end()}
    if (!request.user || blog.user.toString() !== request.user._id.toString()) {
        return response.status(401).json({error: "Only the creator of the blog can delete it"})
    }
    blog.remove()
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
    response.json(blog)
})

module.exports = blogsRouter