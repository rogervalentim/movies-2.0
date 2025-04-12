"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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

  // Mudar para imagem anterior
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedImage(movieImages[currentIndex - 1].file_path);
    }
  };

  // Mudar para próxima imagem
  const nextImage = () => {
    if (currentIndex < movieImages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedImage(movieImages[currentIndex + 1].file_path);
    }
  };

  return (
    <div className="relative py-[100px] bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
      <h2 className="text-white font-bold text-xl md:text-2xl text-center leading-tight my-6">
        Galeria de Fotos
      </h2>

      <div className="pl-[1.95rem] px-[1.95rem]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 15 }, // Telas pequenas
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
                className="w-[320px] h-[200px] object-cover rounded-[3px] border border-[#333] shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openImage(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal para exibir imagem ampliada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[10001]">
            <button
              onClick={closeImage}
              className="absolute top-5 right-5 text-white text-3xl"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              disabled={currentIndex === 0}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-opacity-80 disabled:opacity-30"
            >
              <ChevronLeft size={40} className="text-black" />
            </button>

            <Image
              src={`https://image.tmdb.org/t/p/w1280${selectedImage}`}
              alt="Imagem ampliada"
              width={900}
              height={500}
              className="max-w-[90%] max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={nextImage}
              disabled={currentIndex === movieImages.length - 1}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-opacity-80 disabled:opacity-30"
            >
              <ChevronRight size={40} className="text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
