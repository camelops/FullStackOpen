const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')

//
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

//...

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})


describe('when there is initially one user in db', () => {
  // beforeEach(async () => {
  //   await User.deleteMany({})

  //   const passwordHash = await bcrypt.hash('sekret', 10)
  //   const user = new User({ username: 'root', passwordHash })

  //   await user.save()
  // })
})

describe('User Creation Rules', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Dune',
      name: 'Matti Luukkainen',
      password: 'camels',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Password cannot be shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'passwordShort',
      name: 'Test: Short Password',
      password: 'a2',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username/Password must be at least three characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Username cannot be shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'us',
      name: 'Test: Short Username',
      password: 'a23123',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username/Password must be at least three characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Password cannot be missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Tester',
      name: 'Test: No Password',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username/Password cannot be missing.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Username cannot be missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Test: No Password',
      password: 'TestPassword'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username/Password cannot be missing.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
