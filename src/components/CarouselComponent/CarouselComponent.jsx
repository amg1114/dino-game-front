import { useEffect, useRef, useState } from "react"
import './CarouselComponent.css'

export const CarouselComponent = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null)
  const delay = 2500;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(
      () =>
        nextSlide(),
      delay
    );

    return () => {
      resetTimeout();
    };

  }, [currentSlide])

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    selectSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    selectSlide(prevIndex);
  };

  const selectSlide = (slide) => {
    setCurrentSlide(slide)
  }

  return <>
    {slides.length ? (
      <div className="carousel">
        <div className="imgWrapper">
          {
            slides.map((slide, index) => (
              <img src={slide.url} key={slide.titulo + '-slide-' + index} alt={slide.titulo} className={index === currentSlide ? ("show animate__animated animate__fadeIn") : ""} />
            ))
          }
          <div className="controls">
            <button onClick={prevSlide} className="prev-button" type="button"> <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span> </button>
            <button onClick={nextSlide} className="next-button" type="button"> <span className="material-symbols-outlined">
              arrow_forward_ios
            </span> </button>
          </div>
        </div>

        <div className="selectores">
          {
            slides.map(
              (slide, index) => {
                return (
                  <button className={"selector " + (currentSlide === index ? 'active' : '')} key={'slide' + index} onClick={() => (selectSlide(index))} type="button">
                  </button>
                )
              }
            )
          }
        </div>
      </div>
    ) : <></>}
  </>;
}