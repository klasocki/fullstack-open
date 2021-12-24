import React, { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatisticLine = ({text, value}) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}

const Statistics = (props) => {
    if (props.good === 0 && props.bad === 0 && props.neutral === 0){
        return (
            <div>
                No feedback given
            </div>
        )
    }
    const sum = props.good + props.bad + props.neutral
    const average = (props.good - props.bad) / sum
    const positive = props.good / sum
    return (
        <div>
            <table>
            <tbody>
                <StatisticLine text="good" value={props.good}/>
                <StatisticLine text="neutral" value={props.neutral}/>
                <StatisticLine text="bad" value={props.bad}/>
                <StatisticLine text="all" value={sum}/>
                <StatisticLine text="average" value={average}/>
                <StatisticLine text="positive" value={positive}/>
            </tbody>
            </table>
        </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
          <h1>give feedback</h1>
          <Button handleClick={() => setGood(good + 1)} text={"good"}/>
          <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
          <Button handleClick={() => setBad(bad + 1)} text={"bad"}/>
          <h1>statistics</h1>
          <Statistics good={good} bad={bad} neutral={neutral}/>

      </div>
  )
}



export default App