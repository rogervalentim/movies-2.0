"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Backdrops } from "@/types";

interface ImageCarouselProps {
  movieImages: Backdrops[];
}

export default function ImageCarousel({ movieImages }: ImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Abrir modal com imagem clicada
  const openImage = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(movieImages[index].file_path);
  };

  // Fechar modal
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative py-[100px] bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
      <h2 className="text-white font-bold text-xl md:text-2xl text-center leading-tight my-6">
        Galeria de Fotos
      </h2>

      <div className="py-8  container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 15 }, // Telas pequenas
            768: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 4, spaceBetween: 25 } // Laptops
          }}
          className="pb-8"
        >
          {movieImages?.map((item, index) => (
            <SwiperSlide key={item.file_path}>
              <Image
                src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
                alt="Imagem do filme"
                width={320}
                height={200}
                quality={100}
                className="w-full h-[200px] object-cover rounded-[3px] border border-[#333] shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openImage(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[10001]">
            <button
              onClick={closeImage}
              className="absolute top-5 right-5 text-white text-3xl"
            >
              <X size={32} />
            </button>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              initialSlide={currentIndex}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.activeIndex);
                setSelectedImage(movieImages[swiper.activeIndex].file_path);
              }}
              className="pb-8 w-full h-full max-w-[90%] max-h-[80vh]"
            >
              {movieImages.map((item) => (
                <SwiperSlide key={item.file_path}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                    alt="Imagem ampliada"
                    width={900}
                    height={500}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
