import React from 'react'

const Header = (props) => {
  return (
      <div>
          <h1>{props.course}</h1>
      </div>
  )
}

const Content = (props) => {
  return (
      <div>
          <Part part={props.data[0]} exercises={props.data[3]}/>
          <Part part={props.data[1]} exercises={props.data[4]}/>
          <Part part={props.data[2]} exercises={props.data[5]}/>
      </div>
  )
}

const Part = (props) => {
  return (
      <div>
          <p>
              {props.part} {props.exercises}
          </p>
      </div>
  )
}

const Total = (props) => {
  return (
      <div>
          <p>Number of exercises {props.num}</p>
      </div>
  )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content data={[part1, part2, part3, exercises1, exercises2, exercises3]} />
            <Total num={exercises1 + exercises2 + exercises3} />
        </div>
    )

}

export default App