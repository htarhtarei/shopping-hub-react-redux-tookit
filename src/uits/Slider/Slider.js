// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//import images
import sliderImg1 from "../../assets/images/slider-img-1.png"
import sliderImg2 from "../../assets/images/slider-img-2.png"
import sliderImg3 from "../../assets/images/slider-img-3.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <div  style={{ zIndex: -1 }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={sliderImg1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sliderImg2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sliderImg3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
