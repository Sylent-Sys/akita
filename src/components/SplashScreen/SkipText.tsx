import { useSwiper } from "swiper/react";

function SkipText() {
  const swiper = useSwiper();
  return (
    <p className="skip-text" onClick={() => swiper.slideTo(3, 1000, false)}>
      Skip
    </p>
  );
}

export default SkipText;
