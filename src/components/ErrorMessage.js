import React from 'react'

const ErrorMessage = ({ message }) => {
    if (message === null) {
        return null
    }
    const className = "error"
    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    )
}


export default ErrorMessage