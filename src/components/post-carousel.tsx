import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { useState, useRef, useEffect } from "react";
import { NextArrow, PrevArrow } from "./arrows";

interface IPostCarouselProps {
  images: Array<{ gatsbyImageData: IGatsbyImageData }>;
}

function PostCarousel(props: IPostCarouselProps) {
  const { images } = props;
  const maxScrollWidth = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<number>(0);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      const offsetWidth = carousel.current.offsetWidth;
      const scroll = offsetWidth * currentIndex;
      if (maxScrollWidth.current > scroll + offsetWidth) {
        setPos(scroll);
      } else {
        setPos(maxScrollWidth.current);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <PrevArrow disabled={isDisabled("prev")} onClick={movePrev} />
          <NextArrow disabled={isDisabled("next")} onClick={moveNext} />
        </div>
        <div ref={carousel} className="carousel-container overflow-hidden">
          <div
            className="relative flex gap-1 transition-transform duration-500"
            style={{
              transform: `translateX(-${pos}px)`,
            }}
          >
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item text-center relative w-80 h-80 flex-shrink-0"
                >
                  <div
                    className="h-full w-full relative overflow-hidden aspect-square block bg-origin-padding bg-center bg-cover bg-no-repeat z-0"
                    style={{
                      backgroundImage: `url(${image.gatsbyImageData.images.fallback.src})`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCarousel;
