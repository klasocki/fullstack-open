import React, {useState, useEffect} from 'react'
import Number from './components/Number'
import Form from './components/Form'
import Search from "./components/Search"
import personService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')


    useEffect(() => {
        personService.getAll().then(persons => {
            setPersons(persons)
        })
    }, [])

    const personsToShow = persons.filter(
        person => person.name.toLowerCase().search(newQuery.toLowerCase()) !== -1
    )

    const addName = (event) => {
        event.preventDefault()
        const oldPerson = persons.find(el => el.name === newName);
        const url = 'http://localhost:3001/persons';
        if (oldPerson) {
            if (window.confirm(`${newName} is already added to the phonebook, replace old number with the new one?`)){
                const changedPerson = {...oldPerson, number: newNumber}
                personService.update(oldPerson.id, changedPerson)
                    .then(updated => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : updated))
                    })
            }
        } else {
            personService.create({name: newName, number: newNumber})
                .then(created => {
                    setPersons(persons.concat(created))
                })
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

    const onDelete = (person) => {
        return () => {
            if (window.confirm(`Delete ${person.name}?`)) {
                personService.deleteId(person.id)
                    .then(response => {
                        setPersons(persons.filter(el => el.id !== person.id))
                    })
            }
        }
    }

    return (
        <div>
            <Search handleQueryChange={handleQueryChange} newQuery={newQuery}/>
            <h2>Phonebook</h2>
            <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            {personsToShow.map((person) => <Number key={person.id} person={person} onDelete={onDelete(person)}/>)}
        </div>
    )
}

export default App