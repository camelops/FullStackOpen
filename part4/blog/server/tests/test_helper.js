const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a729'),
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a729'),
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a729'),
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a729'),
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a728'),
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: mongoose.Types.ObjectId('608b815e27b6f568b421a728'),
    __v: 0
  }  
]

const initialUsers = [
  {
    notes: [],
    username: 'root',
    name: 'superuser',
    id: '608b815e27b6f568b421a728'
  },
  {
    notes: [],
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    id: '608b815e27b6f568b421a729'
  }

]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'toremove', url: 'toremove', user: 'dud', likes:0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlog, initialUsers, nonExistingId, blogsInDb, usersInDb
}