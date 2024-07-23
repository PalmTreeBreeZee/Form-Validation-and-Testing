import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */
  test('throws an error saying pass valid numbers', () => {
    expect(()=> sum()).toThrow()
    
  })

  test('throws an error pass valid numbers if it is a word', () => {
    expect(()=>sum()).toThrowError('pass valid numbers')
  })

  test('returns as 4', () => {
    const expected = 4
    const actual = sum(2, 2)
    expect(actual).toBe(expected)
  })

  test('return as 3', () => {
    const expected = 3
    const actual = sum(1, 2)
    expect(actual).toBe(expected)
  })
  test('returns as 13', () =>{
    const expected = 13
    const actual = sum(7, 6)
    expect(actual).toBe(expected)
  })
  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })
  it('renders a link that reads (Home)', ()=> {
    render(<HelloWorld />)
    expect(screen.queryByText('Home')).toBeInTheDocument()

  })
  it('renders a link that reads (About)', ()=> {
    render(<HelloWorld />)
    expect(screen.queryByText('About')).toBeInTheDocument()
  })
  it('renders a link that reads (Blog)', ()=> {
    render(<HelloWorld />)
    expect(screen.queryByText('Blog')).toBeInTheDocument()
  })
  it('renders a link that reads (The Truth)', ()=> {
    render(<HelloWorld />)
    expect(screen.queryByText('The Truth')).toBeVisible()
  })
  it('renders a link that reads (JavaScript is pretty awesome)', ()=> {
    render(<HelloWorld />)
    screen.debug()
    expect(screen.queryByText('JavaScript is pretty awesome')).toBeVisible()
  })
  it('renders a link that reads (Javascript is pretty)', ()=> {
    render(<HelloWorld />)
    expect(screen.queryByText('javaScript is pretty', { exact: false })).toBeInTheDocument()
  })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
