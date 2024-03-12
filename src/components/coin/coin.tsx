import Spline from "@splinetool/react-spline";
import s from "./coin.module.css";
import { useEffect, useState } from "react";

function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
}
export const Coin = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Spline
        style={{ width: "500px", height: "500px" }}
        className={s["main-coin"]}
        scene={
          windowDimensions.width > 500
            ? "https://prod.spline.design/3gv92v6EJvS45AIL/scene.splinecode"
            : "https://prod.spline.design/eVHNDmMg-5EMjId6/scene.splinecode"
        }
      />
    </div>
  );
};
