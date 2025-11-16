import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomerCard from "./atoms/CustomerCard";
import useIsMobile from "../hooks/UseIsMobile";

const CustomerSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: 'Sarah & Dimas',
    text: 'Platform ini sangat membantu! Kami menemukan venue impian untuk lamaran kami dalam 2 hari.',
    rating: 5,
    venue: 'Grand Ballroom Elegance',
    image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Tim Marketing PT. Nusantara',
    text: 'Ruang Temu membantu kami menemukan ruang meeting yang nyaman dan lengkap dengan fasilitas audio-visual.',
    rating: 5,
    venue: 'Corporate Meeting Hall',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Komunitas Basket Jakarta',
    text: 'Venue olahraga yang kami sewa sangat luas dan aman. Booking mudah melalui platform Ruang Temu.',
    rating: 5,
    venue: 'Indoor Basketball Court',
    image: 'https://images.unsplash.com/photo-1571019613914-85f342c0b10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Rina & Ahmad',
    text: 'Budget estimator sangat akurat dan membantu kami merencanakan anggaran pesta ulang tahun anak kami.',
    rating: 5,
    venue: 'Royal Garden Venue',
    image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Organisasi Bazaar Kreatif',
    text: 'Acara bazaar berjalan lancar, venue strategis dan mudah diakses. Vendor dan peserta sangat puas.',
    rating: 5,
    venue: 'City Convention Center',
    image: 'https://images.unsplash.com/photo-1596079891545-1a02b16f8044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];


  return (
    <section className="bg-ruangTemuLight w-full py-16">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-2xl font-bold text-mainColor mb-2 font-dancingScript">
          Apa Kata Mereka ?
        </h2>

        <div className="flex items-center justify-center w-[90dvw] justify-self-center">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={isMobile ? 1 : 3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            loop
            centeredSlides
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className={`w-[90dvw] sm:w-[85%]`}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "scale-105 opacity-100 z-20"
                      : "scale-90 opacity-80"
                  }`}
                >
                  <CustomerCard {...item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
