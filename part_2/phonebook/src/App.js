import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import ContactForm from './ContactForm'
import Numbers from './Numbers';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searching, setSearching] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })   
    }, [])

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