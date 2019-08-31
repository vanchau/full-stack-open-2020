import React from 'react';

const Numbers = ({searching, persons}) => {
    const toShow = persons.filter(person => person.name.toLowerCase().includes(searching.toLowerCase()))
    return (
        <div>
            <h2>Numbers</h2>
            {toShow.map(person => 
                <div key={person.name}>{person.name} {person.number}</div>
            )}
        </div>
    );
};

export default Numbers;