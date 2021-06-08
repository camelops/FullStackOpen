import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if ( props.notification.message  === '') {
    return null
  }

  console.log(props.notification)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: props.notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return (
    <div style={style}>
      { props.notification.message }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
  )(Notification)

export default ConnectedNotification