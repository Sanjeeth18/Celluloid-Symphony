import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from '../src/pages/About'

function App() {
  return (
    <>  
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
