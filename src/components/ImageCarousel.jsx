import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './ImageCarousel.css';

const ImageCarousel = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null; 
  }

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow, A11y]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={item.text} />
            <div className="slide-caption">{item.text}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;