import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === '') {
      return state.anecdotes
    }
    console.log(state.filter)
    console.log(state.anecdotes)
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter)
    )
  })

  const vote = async (anecdote) => {
    console.log('vote', anecdote)
    dispatch(addVote(anecdote))
    dispatch(notify(`you voted '${anecdote.content}'`, 2))
  }

  anecdotes.sort(function(a, b) {
    return b.votes - a.votes
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
