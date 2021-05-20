const initialMessage = 'Notification will be present here.'

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      message: message
    }
  }
}

const reducer = (state = initialMessage, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NOTIFY': {
        return action.data
      }
    default:
      return state
  }
}

export default reducer