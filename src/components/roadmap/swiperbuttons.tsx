import { useSwiper } from "swiper/react";
import s from "./roadmap.module.css";
import SwiperBtn from "../../assets/imgs/swiper-btn.svg";
export const SwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <div className={s["btns"]}>
      <button className={s["btn"]} onClick={() => swiper.slidePrev()}>
        <img src={SwiperBtn} alt="" />
      </button>
      <button className={s["btn"]} onClick={() => swiper.slideNext()}>
        <img src={SwiperBtn} alt="" />
      </button>
    </div>
  );
};
