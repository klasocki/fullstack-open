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
            {props.parts.map(part => <Part part={part} key={part.id}/>)}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {
                props.parts.reduce((partial_sum, part) => partial_sum + part.exercises, 0)
            }</p>
        </div>
    )
}

const Course = ({course}) =>
    (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )

export default Course