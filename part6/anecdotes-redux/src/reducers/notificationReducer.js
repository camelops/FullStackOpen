const initialMessage = {
  message: 'Notification will be present here.',
  id: 1
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const notify = (message, length) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message: message,
        id: getId()
      }
    })
    let timeout = Number(length) * 1000
    console.log(timeout)
    setTimeout(function () {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeout)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

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