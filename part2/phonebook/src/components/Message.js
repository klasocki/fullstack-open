import React from 'react'

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const successStyle = {
        color: (type === 'success') ? 'green': 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={successStyle} className='success'>
            {message}
        </div>
    )
}

export default Notification