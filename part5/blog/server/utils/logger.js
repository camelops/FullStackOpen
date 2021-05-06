const info = (...params) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params)
  } else if (process.env.NODE_ENV === 'tesst') {
    //console.log(...params)
  }
}
  
const error = (...params) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...params)
  } else if (process.env.NODE_ENV === 'test') {
    //console.error(...params)
  }
}
  
module.exports = {
  info, error
}