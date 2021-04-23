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

describe('Blog Editing and Creation', () => {
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
  
  test('blog without URL is not added', async () => {
    const newBlog = {
      title: 'TEST: No URL',
      author: 'Tester McTest',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
  })
  
  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Tester McTest',
      url: 'TEST: No URL',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
  })

  test('Blog can be edited', async () => {
    const blogAtStart = await helper.blogsInDb()
    let blogToEdit = blogAtStart[0]

    blogToEdit.likes += 1

    console.log(blogToEdit.id)

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    // Fix below
    const blogsAtEnd = await helper.blogsInDb()
    const editedBlog = blogsAtEnd[0]

    expect(editedBlog.likes).toEqual(blogToEdit.likes)

  })
  
  test('Blogs have Unique IDs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})


describe('Blog Retrieval', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlog.length)
  })
  
  test('Blogs have Unique IDs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
})



describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlog.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})