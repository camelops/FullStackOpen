import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
    // data: {
    //   id: getId(),
    //   content: content,
    //   votes: 0
    // }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }

}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(note =>
        note.id !== id ? note : changedAnecdote
        )
      }
    case 'NEW_ANECDOTE': {
      console.log("adding")
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES': {
      console.log("initing")
      return action.data
    }
    default:
      return state
  }
}

export default reducer