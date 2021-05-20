import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import { createStore } from 'redux'

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store