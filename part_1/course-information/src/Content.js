import React from 'react'
import Part from './Part'

const Content = (props) => {
    console.log(props.parts[0].exercises)
    return (
        <div>
            {props.parts.map(part => (
                <Part key={part.name} name={part.name} exercises={part.exercises}/>
            ))}
        </div>
    )}

export default Content;
