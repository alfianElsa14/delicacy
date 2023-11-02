import React, { useState, useEffect } from 'react';
import style from '../styles/styles.module.scss'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Favorites = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    setFavoriteMeals(favorites);
  }, []);

  const getFavoritesFromLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
  };

  return (
    <div className={style.container}>
      <h1>Delicacy</h1>
      <div>
        {favoriteMeals.map((el) => (
          <div className={style.cardsFavorites}>
            <Link to={`/${el?.idMeal}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    width="100"
                    image={el?.strMealThumb}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {el?.strMeal}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Favorites;
