import React from 'react';
import './SeriesDetails.css';


function SeriesDetails({ movie }) {
  return (
    <>
      <div className="contains">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='imagesseries'/> 
        <div className='containers0'>
          <div className="containers1">
            <div className='text-titles'>
              {movie.title}
            </div>
            <div className='texts'>
              Title-1
            </div>
            <div className='texts'>
              Title-2
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default SeriesDetails;