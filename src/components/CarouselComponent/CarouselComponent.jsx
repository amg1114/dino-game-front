import { useEffect, useState } from "react"
import './CarouselComponent.css'

export const CarouselComponent = ({ slides }) => {
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

      <div className="imgWrapper">
        <img src={slides[currentSlide].url} alt={slides[currentSlide].titulo} />
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

