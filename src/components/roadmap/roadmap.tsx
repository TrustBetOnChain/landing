import {Swiper, SwiperSlide} from "swiper/react"
import { FreeMode } from 'swiper/modules';
import { useSwiper } from "swiper/react";
import "./swiper.css"
export const Roadmap = () =>{
    const swiper = useSwiper()
    return(
        <section>
            <button onClick={() => swiper.slideNext()}>next</button>
            <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide-1">Slide 1</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 3</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 4</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 2</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 5</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 6</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 7</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 8</SwiperSlide>
        <SwiperSlide className="swiper-slide-1">Slide 9</SwiperSlide>
      </Swiper>
        </section>
    )
}