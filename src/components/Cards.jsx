import React from 'react'
import style from '../styles/styles.module.scss'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import food from '../assets/dish 2 1.png'
import { Link } from 'react-router-dom';

function Cards({ names, details }) {
  return (
    <>
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
    </>
  )
}

export default Cards