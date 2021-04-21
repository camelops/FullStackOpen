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
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}