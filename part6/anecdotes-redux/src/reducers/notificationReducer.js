const initialMessage = {
  message: 'Notification will be present here.',
  id: 1
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const notify = (message, length) => {
  console.log(length)
  return async dispatch => {
    
    setTimeout(() => dispatch({
      type: 'CLEAR_NOTIFICATION'
    }), length * 1000)

    dispatch({
      type: 'NOTIFY',
      data: {
        message: message,
        id: getId()
      }
    })

  }
}



// export const clearNotification = (length) => {
//   return dispatch =>{
//     setTimeout(() => dispatch({type: 'CLEAR_NOTIFICATION'}), length * 1000)
// }}

const reducer = (state = initialMessage, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NOTIFY': {
      return {
        ...state,
        message: action.data.message,
        id: getId()
      }
    }
    case 'CLEAR_NOTIFICATION': {
      return {
        ...state,
        message: '',
        id: 0
      }
    }
    default:
      return state
  }
}

export default reducer