import Spline from "@splinetool/react-spline";
import s from "./coin.module.css";
export const Coin = () => (
  <div>
    <Spline
      style={{ width: "500px", height: "500px" }}
      className={s["main-coin"]}
      scene={
        window.innerWidth > 500
          ? "https://prod.spline.design/3gv92v6EJvS45AIL/scene.splinecode"
          : "https://prod.spline.design/eVHNDmMg-5EMjId6/scene.splinecode"
      }
    />
  </div>
);
