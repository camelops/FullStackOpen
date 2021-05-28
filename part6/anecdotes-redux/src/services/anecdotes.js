import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0, id: getId()}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (anecdote) => {
  const object = { content: anecdote.content, votes: anecdote.votes + 1, id: anecdote.id}
  const response = await axios.put(baseUrl + `/${anecdote.id}`, object)
  return response.data
}

const exportedObject = {
  getAll,
  createNew,
  addVote
};

export default exportedObject