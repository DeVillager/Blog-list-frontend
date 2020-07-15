import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    // const className = message[1] ? "errorMessage" : "notification"
    const className = "notification"
    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    )
}


export default Notification