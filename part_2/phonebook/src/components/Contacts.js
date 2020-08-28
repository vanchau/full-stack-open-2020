import React from "react";

const Contacts = ({ searching, persons, handleDeletion }) => {
  const toShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searching.toLowerCase())
  );
  return (
    <div>
      <h2>Numbers</h2>
      {toShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDeletion(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
