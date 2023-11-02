import React from 'react'
import style from '../styles/styles.module.scss'
import image from '../assets/salmon 1.png'
import icon from '../assets/Vector.png'
import { useNavigate, Link } from 'react-router-dom';


function CardDetail({ details, meals }) {

  const truncateDescription = (description) => {
    if (description.length <= 200) {
      return description;
    }
    return description.slice(0, 200) + '...';
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.find((meal) => meal.idMeal === details.idMeal)) {
      favorites.push(details);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      alert('Meal is already in favorites.');
    }
  };


  return (
    <div className={style.container}>
      {
        meals.map((el) => (
          <div className={style.cardDetail}>
            <div className={style.detail}>
              <h1>{el.strMeal}</h1>
              <p>
                {
                  truncateDescription(details?.strInstructions || '')

                }
              </p>
              <div className={style.ingridients}>
                <h2>Ingridients</h2>
                <div className={style.bahan}>
                  <img src={icon} alt="" />
                  <label htmlFor=""><strong>{details?.strIngredient1}: </strong></label>
                  <label htmlFor="">{details?.strMeasure1}</label>
                </div>
                <div className={style.bahan}>
                  <img src={icon} alt="" />
                  <label htmlFor=""><strong>{details?.strIngredient2}: </strong></label>
                  <label htmlFor="">{details?.strMeasure2}</label>
                </div>
                <div className={style.bahan}>
                  <img src={icon} alt="" />
                  <label htmlFor=""><strong>{details?.strIngredient3}: </strong></label>
                  <label htmlFor="">{details?.strMeasure3}</label>
                </div>
                <div className={style.bahan}>
                  <img src={icon} alt="" />
                  <label htmlFor=""><strong>{details?.strIngredient4}: </strong></label>
                  <label htmlFor="">{details?.strMeasure4}</label>
                </div>
                <div className={style.buttonContainer}>
                  <Link to={`/${el?.idMeal}`}>
                    <button>Detail</button>
                  </Link>
                  <Link to={`/my/favorite`}>
                  <button onClick={addToFavorites}>Add to Favorite</button>
                  </Link>
                </div>
              </div>
              <div className={style.image}>
                <img src={el?.strMealThumb} alt={details?.strMeal} />
              </div>
            </div>

          </div>
        ))
      }

    </div>

  )
}

export default CardDetail