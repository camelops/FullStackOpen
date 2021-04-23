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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogRouter