import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "../src/pages/About";
import MovieDetails from "./pages/MovieDetails";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    document.title = "Celluloid Symphony - Explore Movies"; 
  }, []); 
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/details" element={<MovieDetails />} />
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/about" element={<About />} />
          <Route exact path='/search' element={<Search/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
