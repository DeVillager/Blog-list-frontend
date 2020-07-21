import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const className = 'notification'
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  )
}


export default Notification