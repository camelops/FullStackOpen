const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
 
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogRouter.post('/', (request, response) => {
  const body = request.body
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes === undefined) ? 0 : body.likes
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
    return
  }
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = blogRouter