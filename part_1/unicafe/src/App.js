import React, {useState} from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text={'Good'}/>
      <Button handleClick={() => setNeutral(neutral+1)} text={'Neutral'}/>
      <Button handleClick={() => setBad(bad+1)} text={'Bad'}/>
      <h1>Statistics</h1>
      {
        all !== 0 ? 
        <div>
          <table>
            <thead>
              <Statistics text={'Good'} value={good}/>
              <Statistics text={'Neutral'} value={neutral}/>
              <Statistics text={'Bad'} value={bad}/>
              <Statistics text={'All'} value={all}/>
              <Statistics text={'Average'} value={average}/>
              <Statistics text={'Positive'} value={positive}/>
            </thead>
          </table>
        </div>
        : 'No feedback given'
      }
    </div>
  )
}

export default App;
