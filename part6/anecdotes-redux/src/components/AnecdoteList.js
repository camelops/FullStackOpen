import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify, clearNotification } from '../reducers/notificationReducer'

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

  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(notify(`you voted '${anecdote.content}'`))
    setTimeout(function () {
      dispatch(clearNotification())

    }, 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
