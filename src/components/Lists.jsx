import React from 'react'
import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SeriesList from '../data/seriesdata';
import Popular from '../data/Popular';
import './Lists.css'
import MovieDetails from './MovieDetails';
import { Container,Row,Col } from 'react-bootstrap';


function Nowplaying() {
  const serieslist=SeriesList();
  const popmovie=Popular();
  const [selectedMovie1, setSelectedMovie1] = useState(null);
  const [selectedMovie2, setSelectedMovie2] = useState(null);

  const clicked1 = (movie) => {
    setSelectedMovie1(prevSelectedMovie1 => prevSelectedMovie1 === movie ? null : movie);
  };

  const clicked2 = (movie) => {
    setSelectedMovie2(prevSelectedMovie2 => prevSelectedMovie2 === movie ? null : movie);
  };
    return (
    <>
        <Container>
            <Row>
                <Col>
                    <h1>Popular Movies</h1>
                </Col>
            </Row>
        </Container>
        <Swiper
            className='container1'
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={4}
            slidesPerView={5}
            loop={true}
            navigation
        >
            {popmovie.map((movie, index) => (
                <SwiperSlide key={index}>
                <img onClick={() => clicked1(movie)}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Movie Poster ${index}`}
                    className='imageslist'
                />
                </SwiperSlide>
            ))}
        </Swiper>
        {selectedMovie1 && <MovieDetails movie={selectedMovie1} />}
        <Container>
            <Row>
                <Col>
                    <h1>TV Series</h1>
                </Col>
            </Row>
        </Container>
        <Swiper
            className='container1'
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={4}
            slidesPerView={5}
            loop={true}
            navigation
            scrollbar={{draggable:true}}

        >
            {serieslist.map((movie, index) => (
                <SwiperSlide key={index}>
                <img onClick={() => clicked2(movie)}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Movie Poster ${index}`}
                    className='imageslist'
                />
                </SwiperSlide>
            ))}
        </Swiper>
        {selectedMovie2 && <MovieDetails movie={selectedMovie2} />}
    </>
    )

}

export default Nowplaying