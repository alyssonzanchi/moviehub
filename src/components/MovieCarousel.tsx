'use client';

import { useKeenSlider, KeenSliderInstance } from 'keen-slider/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MovieCard } from '@/components/MovieCard';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

interface Props {
  title: string;
  movies: Movie[];
}

export function MovieCarousel({ title, movies }: Props) {
  const [sliderInstance, setSliderInstance] =
    useState<KeenSliderInstance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 5,
      spacing: 16
    },
    created(instance) {
      setSliderInstance(instance);
    }
  });

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      sliderInstance?.next();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetAutoSlide = () => {
    startAutoSlide();
  };

  useEffect(() => {
    if (sliderInstance) {
      startAutoSlide();
    }

    return () => {
      stopAutoSlide();
    };
  }, [sliderInstance]);

  return (
    <div className="relative group max-w-[70rem] mx-auto px-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div ref={sliderRef} className="keen-slider">
        {movies.map((movie) => (
          <div className="keen-slider__slide" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          sliderInstance?.prev();
          resetAutoSlide();
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center transition cursor-pointer"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => {
          sliderInstance?.next();
          resetAutoSlide();
        }}
        className="absolute right-0 top-1/2 -mr-12 -translate-y-1/2 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center transition cursor-pointer"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
