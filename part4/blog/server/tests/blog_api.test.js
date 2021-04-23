const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('Blogs have Unique IDs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('A valid blog post can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Tester McTest',
    url: 'https://test.com/',
    likes: 13,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

  const contents = blogsAtEnd.map(n => n.title)

  expect(contents).toContain(
    'Test Blog'
  )
})

test('A new blog without likes will be set to 0', async () => {
  const newBlog = {
    title: 'TEST: No likes',
    author: 'Tester McTest',
    url: 'https://test.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const content = blogs.find(n => n.title === 'TEST: No likes')

  expect(content.likes).toEqual(0)
})


afterAll(() => {
  mongoose.connection.close()
})