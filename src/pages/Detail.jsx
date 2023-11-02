import React, { useEffect, useState } from 'react'
import style from '../styles/styles.module.scss'
import icon from '../assets/Vector.png'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';



function Detail() {
  const [detailMeal, setDetailMeal] = useState()
  const { id } = useParams()
  const [names, setNames] = useState([])

  useEffect(() => {
    async function mealsById() {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        setDetailMeal(response.data.meals[0])
        console.log(response.data.meals[0]);
      } catch (error) {
        console.log(error);
      }
    }

    mealsById()
  }, [id])

  useEffect(() => {

    fetchMealsName()
  }, [])
  async function fetchMealsName() {
    try {
      const mealName = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
      const sliceName = mealName.data.meals.slice(0, 6)
      console.log(sliceName);
      setNames(sliceName)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={style.container}>
      <h1>Delicacy</h1>
      <div className={style.content}>
        <div className={style.cardDetail}>
          <div className={style.detail}>
            <h1>{detailMeal?.strMeal}</h1>
            <p>
              {detailMeal?.strInstructions}
            </p>
            <div className={style.ingridients}>
              <h2>Ingridients</h2>
              <div className={style.bahan}>
                <img src={icon} alt="" />
                <label htmlFor=""><strong>{detailMeal?.strIngredient1}: </strong></label>
                <label htmlFor="">{detailMeal?.strMeasure1}</label>
              </div>
              <div className={style.bahan}>
                <img src={icon} alt="" />
                <label htmlFor=""><strong>{detailMeal?.strIngredient2}: </strong></label>
                <label htmlFor="">{detailMeal?.strMeasure2}</label>
              </div>
              <div className={style.bahan}>
                <img src={icon} alt="" />
                <label htmlFor=""><strong>{detailMeal?.strIngredient3}: </strong></label>
                <label htmlFor="">{detailMeal?.strMeasure3}</label>
              </div>
              <div className={style.bahan}>
                <img src={icon} alt="" />
                <label htmlFor=""><strong>{detailMeal?.strIngredient4}: </strong></label>
                <label htmlFor="">{detailMeal?.strMeasure4}</label>
              </div>
              <div className={style.buttonContainer}>
                <button>Add to Favorite</button>
              </div>
            </div>
          </div>
          <div className={style.imageDetail}>
            <img src={detailMeal?.strMealThumb} alt="" />
          </div>
        </div>
        <div>
          <h1>More Recipes</h1>
          <div className={style.cards}>
            {
              names.map((el) => (
                <Link to={`/${el?.idMeal}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={el?.strMealThumb}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {el?.strMeal}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail