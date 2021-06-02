import React from 'react'
import { connect } from 'react-redux' 
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state.filter
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)