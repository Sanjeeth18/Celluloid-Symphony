import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Mainswiper.css';
import MovieList from '../data/moviedata';
import MovieDetails from './MovieDetails';

export default () => {
  const movieList = MovieList();
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  const [selectedMovie, setSelectedMovie] = useState(null);

  const clicked = (movie) => {
    setSelectedMovie(prevSelectedMovie => prevSelectedMovie === movie ? null : movie);
  };

  return (
    <>
      <Swiper
        className='containerms'
        spaceBetween={0}
        slidesPerView={3}
        loop={true}
        navigation
        scrollbar={{draggable:true}}
      >
        {movieList.map((movie, index) => (
          <SwiperSlide key={index}>
            <img onClick={() => clicked(movie)}
              src={`${baseUrl}${movie.poster_path}`}
              alt={`Movie Poster ${index}`}
              className='images1'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </>
  );
};
