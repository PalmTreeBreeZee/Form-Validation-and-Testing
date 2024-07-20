import React from 'react'
import pizza from './images/pizza.jpg'


function Home() {
  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      {/* clicking on the img should navigate to "/order" */}
      <a href= ''>
      <img alt="order-pizza" style={{ cursor: 'pointer' }} src={pizza} />
      </a>
    </div>
  )
}

export default Home
