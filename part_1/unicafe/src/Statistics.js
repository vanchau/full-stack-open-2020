import React from 'react'
import Statistic from './Statistic'

const Statistics = ({good, neutral, bad}) => {
    const all = good+neutral+bad
    const average = (good-bad)/all
    const positive = good/all*100
    return (
    <div>
        <h1>Statistics</h1>
        {
            all !== 0 ? 
            <div>
            <table>
                <thead>
                <Statistic text={'Good'} value={good}/>
                <Statistic text={'Neutral'} value={neutral}/>
                <Statistic text={'Bad'} value={bad}/>
                <Statistic text={'All'} value={all}/>
                <Statistic text={'Average'} value={average}/>
                <Statistic text={'Positive'} value={positive}/>
                </thead>
            </table>
            </div>
            : 'No feedback given'
        }
    </div>
    )
    
}

export default Statistics