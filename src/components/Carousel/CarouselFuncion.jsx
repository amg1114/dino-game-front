import { useState } from "react"
import './carousel.css'

export const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevIndex);
  };

  const selectSlide = (slide) => {
    setCurrentSlide(slide)
  }

  return (

    <div className="carousel">

      <img src={slides[currentSlide].url}
        alt={slides[currentSlide].titulo} />

      <div className="selectores">

      {
        slides.map(
          (slide, index) =>{
            return (
              <button className="selector" key={'slide' + index} onClick={()=>(selectSlide(index))} type="button"> slide{index} 
              </button>
            )
          }
        )
      }

      </div>

      <div className="controlers">

        <button onClick={prevSlide}> anterior </button>

        <button onClick={nextSlide} type="button"> siguiente </button>

      </div>


    </div>



    /*<div className="slider">
      <div className="slide">
        <img src={slides[currentSlide].imageUrl} alt={slides[currentSlide].altText} />
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
      </div>
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
</div>*/
  );
}

