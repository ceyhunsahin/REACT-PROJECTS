 import "./cards.scss";
 import { useState } from "react";

export default function Cards({image , city, desc}) {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseOver = () => {
        setIsFlipped(true);
      };
    
      const handleMouseOut = () => {
        setIsFlipped(false);
      };

    return (
        <div className="cards" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={`cards-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
            
                {!isFlipped && (

                <div className="cards-card-inner-card-front" >
                    <h3>{city}</h3>
                    <img className = "cards-card-inner-card-front-img-cls"  src={image} alt={city} />

                </div>)}
                {isFlipped && (

                    <div className="cards-card-inner-card-front">
                        <p>{desc}</p>
                    </div>)}
            </div>
  
        </div>
    )
}
