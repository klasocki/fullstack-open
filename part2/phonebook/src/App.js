import React, {useState, useEffect} from 'react'
import Number from './components/Number'
import Form from './components/Form'
import Search from "./components/Search"
import Notification from "./components/Message"
import personService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService.getAll().then(persons => {
            setPersons(persons)
        })
    }, [])

    const personsToShow = persons.filter(
        person => person.name.toLowerCase().search(newQuery.toLowerCase()) !== -1
    )

    const notifyOfSuccess = (msg) => {
        setSuccessMessage(msg)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }
    const notifyOfError = (msg) => {
        setErrorMessage(msg)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
    const addName = (event) => {
        event.preventDefault()
        const oldPerson = persons.find(el => el.name === newName);
        if (oldPerson) {
            if (window.confirm(`${newName} is already added to the phonebook, replace old number with the new one?`)) {
                const changedPerson = {...oldPerson, number: newNumber}
                personService.update(oldPerson.id, changedPerson)
                    .then(updated => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : updated))
                        notifyOfSuccess(`${oldPerson.name} updated`)
                    })
                    .catch(error => {
                        notifyOfError(`${oldPerson.name} has already been removed from the server`)
                    })
            }
        } else {
            personService.create({name: newName, number: newNumber})
                .then(created => {
                    setPersons(persons.concat(created))
                })
            notifyOfSuccess(`New person - ${newName} created`)
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
                        notifyOfSuccess(`${person.name} deleted`)

                    })
                    .catch(error => notifyOfError(`${person.name} has already been removed from the server`))
            }
        }
    }

    return (
        <div>
            <Search handleQueryChange={handleQueryChange} newQuery={newQuery}/>
            <h2>Phonebook</h2>
            <Form addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
            <Notification message={errorMessage} type={"error"}/>
            <Notification message={successMessage} type={"success"}/>
            <h2>Numbers</h2>
            {personsToShow.map((person) => <Number key={person.id} person={person} onDelete={onDelete(person)}/>)}
        </div>
    )
}

export default App