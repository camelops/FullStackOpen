// const blog = require("../models/blog")

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach(function(blog) {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let result = {}


  blogs.forEach(function(blog) {
    if (blog.likes >= maxLikes){
      result = blog
      maxLikes = blog.likes
    }
  })

  return result
}


const mostBlogs = (blogs) => {
  let result = {}
  let dict = {}

  blogs.forEach(function(blog) {
    if (dict[blog.author] != null){
      dict[blog.author] += 1
    } else {
      dict[blog.author] = 1
    } 
  })

  let max_blogs = 0

  for(let key in dict) {
    if(dict[key] > max_blogs) {
      result = {
        author: key,
        blogs: dict[key]
      }
      max_blogs = dict[key]
    }
  }

  return result
}

const mostLikes = (blogs) => {
  let result = {}
  let dict = {}

  blogs.forEach(function(blog) {
    if (dict[blog.author] != null){
      dict[blog.author] += blog.likes
    } else {
      dict[blog.author] = blog.likes
    } 
  })

  let max_likes = 0

  for(let key in dict) {
    if(dict[key] > max_likes) {
      result = {
        author: key,
        blogs: dict[key]
      }
      max_likes = dict[key]
    }
  }

  return result
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}