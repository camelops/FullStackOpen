const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


describe('Login and Authentication', () => {
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)

    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  


})

afterAll(() => {
  mongoose.connection.close()
})