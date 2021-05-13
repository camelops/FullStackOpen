const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


// const User = require('../models/user')


// const retrieveUser = async (request, response) => {
//   // Authenticating User before adding blog 
//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid'})
//   }
//   const user = await User.findById(decodedToken.id)
//   console.log(user)
//   return user
// }

blogRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blog)
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  console.log(request.user)

  if (request.user === undefined) {
    response.status(401).end()
    return
  }
  const user = request.user

  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
    return
  }
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes === undefined) ? 0 : body.likes,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // const user = await retrieveUser(request, response)
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  console.log(blog)
  console.log(user)

  if(blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

})


blogRouter.put('/:id', (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // user: mongoose.Types.ObjectId(request.body.user.id)
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogRouter