import React from 'react';
import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container, Row, Col } from 'react-bootstrap';
import './Lists.css';
import PlayingList from '../data/playing';
import Upcoming from '../data/upcoming';
import MovieDetails from './MovieDetails';

function Lists_1() {
  const play = PlayingList();
  const upcome = Upcoming();
  const [selectedMovie3, setSelectedMovie3] = useState(null);
  const [selectedMovie4, setSelectedMovie4] = useState(null);

  const clicked3 = (movie) => {
    setSelectedMovie3((prevSelectedMovie3) => (prevSelectedMovie3 === movie ? null : movie));
  };

  const clicked4 = (movie) => {
    setSelectedMovie4((prevSelectedMovie4) => (prevSelectedMovie4 === movie ? null : movie));
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Now Playing Movies</h1>
          </Col>
        </Row>
      </Container>
      <Swiper
        className='container1'
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        navigation
      >
        {play.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              onClick={() => clicked3(movie)}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Movie Poster ${index}`}
              className='imageslist'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedMovie3 && <MovieDetails movie={selectedMovie3} />}

      <Container>
        <Row>
          <Col>
            <h1>Upcoming Movies</h1>
          </Col>
        </Row>
      </Container>
      <Swiper
        className='container1'
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        navigation
      >
        {upcome.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              onClick={() => clicked4(movie)}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Movie Poster ${index}`}
              className='imageslist'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedMovie4 && <MovieDetails movie={selectedMovie4} />}
    </>
  );
}

export default Lists_1;
