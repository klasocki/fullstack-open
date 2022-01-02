import React, {useState} from 'react'
import Number from './components/Number'
import Form from './components/Form'
import Search from "./components/Search"    

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')

    const personsToShow = persons.filter(
        person => person.name.toLowerCase().search(newQuery.toLowerCase()) !== -1
    )

    const addName = (event) => {
        event.preventDefault()
        if (persons.find(el => el.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
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

    const handleQueryChange = (event) => {
        setNewQuery(event.target.value)
    }

    return (
        <div>
            <Search handleQueryChange={handleQueryChange} newQuery={newQuery}/>
            <h2>Phonebook</h2>
            <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            {personsToShow.map((person) => <Number key={person.id} person={person}/>)}
        </div>
    )
}

export default App