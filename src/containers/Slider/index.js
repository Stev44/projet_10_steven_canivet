import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 /* correction ">" pour trier dans l'ordre croissant  */
  );
  
  
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), /* correction byDateDesc.length *- 1* pour éviter que le slider dépasse l'index en cours  */
      5000
    );
  };
  useEffect(() => {
    if(byDateDesc !== undefined){ /* vérifie si byDateDesc n'est pas undefined, si et seulement si elle ne l'est pas alors on peut initialiser la fonction nextSlide() */
      nextCard();
    }
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}> {/* remplacement du fragment par une div avec une key unique */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((button, radioIdx) => (
                <input
                  key={button.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} /* correction de idx par l'index du state */
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
