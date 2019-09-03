import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import ContactForm from './ContactForm'
import Contacts from './Contacts';
import contactService from '../services/contacts.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searching, setSearching] = useState('')

    useEffect(() => {
        contactService
            .getAll()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = 
        {
            name: newName,
            number: newNumber
        }
        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            if (window.confirm((`${newName} is already added to phonebook. Replace the old number with a new one?`))) {
                const existingContact = persons.find(person => person.name === newPerson.name)
                const updatedContact = {...existingContact, number: newNumber}
                contactService 
                    .update(updatedContact.id, updatedContact)
                    .then(updatedContact => {
                        setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact))
                    })
            }
            else {
                setNewName('')
                setNewNumber('')
            }
        }

        else {
        contactService
            .create(newPerson)
            .then(returnedContact => {
                setPersons(persons.concat(returnedContact))
            }) 
        setNewName('')
        setNewNumber('')
        }
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

    const handleDeletetion = (id, name) => {
        if (window.confirm(`Delete ${name}?`))
        contactService
            .remove(id)
            .then(setPersons(persons.filter(person => person.id !== id)))
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
            <Contacts
                searching={searching}
                persons={persons}
                handleDeletion={handleDeletetion}
            />
        </div>
    )
}

export default App