import { useSwiper } from "swiper/react";

function SkipText({ invisible = false }) {
  const swiper = useSwiper();
  return (
    <p
      className={`${invisible ? "hidden-text" : ""} skip-text`}
      onClick={() => swiper.slideTo(3, 1000, false)}
    >
      Skip
    </p>
  );
}

export default SkipText;
