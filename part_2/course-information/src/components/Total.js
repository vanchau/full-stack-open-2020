import React from 'react'

const Total = (props) => {
    const total = props.parts.reduce((total, {exercises}) => total+exercises, 0)
    return (
        <b>Total of {total} exercises</b>
    )
}

export default Total;