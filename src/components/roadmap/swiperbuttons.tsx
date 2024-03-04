import { useSwiper } from "swiper/react";

export const SwiperButtons = () =>{
    const swiper = useSwiper()
    return(
    <div>
        <button onClick={() => swiper.slidePrev()}>prev</button>
        <button onClick={() => swiper.slideNext()}>next</button>
    </div>

    )
}