import React from 'react'
import Header from '../components/Header'
import Nowplaying from '../components/Lists'
import Footer from '../components/Footer'
import Lists_1 from '../components/Lists_1'

function Home() {
  return (
    <div className='bg-white m-3'>
        <Header value={true}/>
        <Nowplaying/>
        <Lists_1/>
        <Footer/>
    </div>
  )
}

export default Home