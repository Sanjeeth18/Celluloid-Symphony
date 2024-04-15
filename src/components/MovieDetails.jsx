import React from 'react';
import './MovieDetails.css';


function MovieDetails({ movie }) {
  return (
    <>
      <div className="contain">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='images'/> 
        <div className='container0'>
          <div className="container1">
            <div className='text-title'>
              {movie.title|| movie.name}
            </div>
            <div className='text'>
              <p><span className='headings'>Release Date : </span>{movie.release_date || movie.first_air_date}  </p>
           </div>
            <div className='text'>
              <p><span className='headings'>Ratings : </span>{movie.vote_average}</p>
            </div>
            <div className='text'>
              <p><span className='headings'>Overview : </span><br></br>{movie.overview}</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;