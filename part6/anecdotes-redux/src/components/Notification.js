
import React from 'react'
import { connect } from 'react-redux'

// import { useSelector } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)ss

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      { props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}


const ConnectedNotification = connect(
  mapStateToProps
  )(Notification)

export default ConnectedNotification