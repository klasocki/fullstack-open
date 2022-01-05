import React from 'react'

const Number = ({person, onDelete}) =>
    (
        <div>{person.name} {person.number} <button onClick={onDelete}>Delete</button></div>
    )


export default Number
