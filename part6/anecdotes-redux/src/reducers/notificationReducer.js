const initialMessage = {
  message: 'Notification will be present here.',
  id: 1
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      message: message,
      id: getId()
    }
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