import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import Notification from "./Notification";
import contactService from "../services/contacts.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searching, setSearching] = useState("");
  const [message, setMessage] = useState("");
  const [dissapear, setDissapear] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
    if (message) {
      setTimeout(() => {
        setDissapear(true);
      }, 5000);
    }
  }, [message]);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        const existingContact = persons.find(
          (person) => person.name === newPerson.name
        );
        const updatedContact = { ...existingContact, number: newNumber };
        contactService
          .update(updatedContact.id, updatedContact)
          .then((updatedContact) => {
            setMessage(`Updated ${newName}`);
            setError(false);
            setPersons(
              persons.map((person) =>
                person.id !== updatedContact.id ? person : updatedContact
              )
            );
          })
          .catch((e) => {
            setMessage(e.response.data.error);
            setError(true);
          });
      } else {
        setNewName("");
        setNewNumber("");
        setMessage("");
        setDissapear(false);
        setError(false);
      }
    } else {
      contactService
        .create(newPerson)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          setMessage(`Added ${newName}`);
          setNewName("");
          setNewNumber("");
          setDissapear(false);
          setError(false);
        })
        .catch((e) => {
          setMessage(e.response.data.error);
          setError(true);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearching(event.target.value);
  };

  const handleDeletetion = (id, name) => {
    if (window.confirm(`Delete ${name}?`))
      contactService
        .remove(id)
        .then(() => {
          setMessage(`Deleted ${name}`);
          setDissapear(false);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((e) => {
          setError(true);
          setMessage(e.response.data.error);
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} dissapear={dissapear} error={error} />
      <Filter searching={searching} handleSearchChange={handleSearchChange} />
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
  );
};

export default App;
