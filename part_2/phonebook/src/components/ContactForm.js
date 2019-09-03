import React from 'react';
import Input from './Input';

const ContactForm = (props) => {
    const {
        newName,
        newNumber,
        handleNameChange,
        handleNumberChange,
        addPerson} = props

    return (
        <div>
            <h2>Add a new number</h2>
            <form onSubmit={addPerson}>
                <div>
                    <Input
                        text={'name: '}
                        value={newName}
                        onChange={handleNameChange}
                    />
                    <Input
                        text={'number: '}
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </div>
    );
};

export default ContactForm;