import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(Array(6).fill(0))
    const [random, setRandom] = useState(selected)

    const handleNext = () => {
        // Prevents repeating anecdotes
        let newRandom = Math.floor(Math.random()*Math.floor(6))
        while (newRandom === random) { newRandom = Math.floor(Math.random()*Math.floor(6)) }
        setSelected(newRandom)
        setRandom(newRandom)

        // With repeating anecdotes
        // setSelected(Math.floor(Math.random()*Math.floor(6)))
        
    }
    const handleVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVote(copy)
    }

    const mostVotes = votes.indexOf(votes.reduce((prev, curr) => prev > curr ? prev : curr))
    
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes.</p>
            <div>
                <button onClick={() => handleVote()}>vote</button>
                <button onClick={() => handleNext()}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[mostVotes]}
            <p>has {votes[mostVotes]} votes.</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)