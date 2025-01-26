import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ActorsDetails from '../components/ActorDetails'

function Actors() {
  return (
    <div className='overflow-hidden'>
      <Header/>
      <ActorsDetails/>
      <Footer/>
    </div>
  )
}

export default Actors
