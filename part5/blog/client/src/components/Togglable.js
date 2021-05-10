import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hidewhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hidewhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonViewLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonViewLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired
}

export default Togglable