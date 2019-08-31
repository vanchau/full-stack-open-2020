import React from 'react';

const Numbers = ({searching, persons}) => {
    const toShow = persons.filter(person => person.name.toLowerCase().includes(searching.toLowerCase()))
    return (
        <div>
            <h2>Numbers</h2>
            {toShow.map(person => 
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    );
};

export default Numbers;