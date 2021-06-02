const initialMessage = {
  message: 'Notification will be present here.',
  id: 1
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const notify = (message, length) => {
  window.clearTimeout(window.timeout);

  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message: message,
        id: getId()
      }
    })

    window.timeout = setTimeout(() => dispatch({
      type: 'CLEAR_NOTIFICATION'
    }), length * 1000)
  }
}

const reducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'NOTIFY': {
      return {
        ...state,
        message: action.data.message,
        id: getId(),
        timeout: action.data.timeout
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