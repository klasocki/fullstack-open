import React, {useState} from 'react'
import Number from './components/Number'
import Form from './components/Form'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '+199 241 14'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if (persons.find(el => el.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat({name: newName, number: newNumber}))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <div>debug: {newName}</div>
            <h2>Phonebook</h2>
            <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            {persons.map((person) => <Number key={person.name} person={person}/>)}
        </div>
    )
}

export default App