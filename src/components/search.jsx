import React, { useState } from 'react';
import './search.css';
import { Button, Card } from 'react-bootstrap';
import MovieDetails from './MovieDetails';

function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie5, setSelectedMovie5] = useState(null);

  const clicked5 = (movie) => {
    setSelectedMovie5(prevSelectedMovie5 => prevSelectedMovie5 === movie ? null : movie);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=44138842cb5326f8d36361f3de1243ad&query=${query}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <div className='search'>
          <form onSubmit={handleSubmit}>
            <input
              type='text' 
              value={query}
              onChange={handleChange}
              className='input-form'
              placeholder="   Search..."
            />
            <Button type='submit' className='btn'>Submit</Button>
          </form>
          <div className="containercards">
          {searchResults.map((result) => (
            result.poster_path && // Render only if poster_path exists
            <Card key={result.id}>
              <Card.Body>
                <div className='containerimages'>
                  <Card.Img className='imagescards' variant="top" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} onClick={() => clicked5(result)}/>
                </div>
                <div className='containerdetails'>
                  <Card.Title className='details-texts'><h2>{result.title || result.name}</h2></Card.Title>
                  <Card.Text>{result.overview ? result.overview : "Overview is not available"}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          ))}
          </div>
        </div>
        {selectedMovie5 && <MovieDetails movie={selectedMovie5} />}
    </>
  );
}

export default Search;

