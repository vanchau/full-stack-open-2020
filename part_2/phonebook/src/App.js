import React, { useState } from 'react'
import Filter from './Filter';
import ContactForm from './ContactForm'
import Numbers from './Numbers';
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456'},
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searching, setSearching] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = 
        {
            name: newName,
            number: newNumber
        }
        persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(newPerson)) 
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearching(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searching={searching}
                handleSearchChange={handleSearchChange}
            />
            <ContactForm 
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
            <Numbers
                searching={searching}
                persons={persons}
            />
        </div>
    )
}

export default App