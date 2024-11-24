import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Results from '../components/Results'
import { useLocation } from 'react-router-dom'

function Search() {

  const location=useLocation();
  const datas=location.state;

  useEffect(()=>{
    console.log(datas)
  },[])

  return (
    <div className='bg-white m-3'>
        <Header value={false}/>
        <Results query={datas}/>
        <Footer/>
    </div>
  )
}

export default Search