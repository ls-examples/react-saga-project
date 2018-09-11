import React from 'react'
import Spinner from 'react-spinkit'

function Loader() {
  return (
    <Spinner
      fadeIn='none'
      name="three-bounce"
    />
  )
}

Loader.propTypes = {}

export default Loader
