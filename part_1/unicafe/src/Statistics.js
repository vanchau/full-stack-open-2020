import React from 'react'

const Statistics = ({text, value}) => {
    return (
        <tr>
        <td>{text}</td>
        <td>{value} {text==='Positive' ? '%' : ''}</td> 
        </tr>
    )
}

export default Statistics