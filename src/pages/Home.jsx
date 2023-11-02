import React, { useEffect, useState } from 'react'
import style from '../styles/styles.module.scss'
import CardDetail from '../components/CardDetail'
import Cards from '../components/Cards'
import axios from 'axios'

function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([])
  const [details, setDetails] = useState()
  const [names, setNames] = useState([])

  async function fetchCategories() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')

      const sliceResponse = response.data.categories.slice(0, 5)

      setCategories(sliceResponse)

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMeals(categoryName) {
    try {
      const resultMeal = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);

      const sliceMeal = resultMeal.data.meals.slice(0, 5)
      setMeals(sliceMeal);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMealsDetail(idMeals) {
    try {
      const detailMeal = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`);
      setDetails(detailMeal.data.meals[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMealsName() {
    try {
      const mealName = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
      const sliceName = mealName.data.meals.slice(0, 6)
      setNames(sliceName)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryNames = categories.map((el) => el.strCategory);
      fetchMeals(categoryNames[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (meals.length > 0) {
      const idMeal = meals[0].idMeal;
      fetchMealsDetail(idMeal);
    }
  }, [meals]);

  useEffect(() => {

    fetchMealsName()
  },[])

  const handleCategoryClick = (id) => {
    fetchMeals(id);
  };


  return (
    <div className={style.container}>
      <h1>Delicacy</h1>
      <div className={style.content}>
        <div className={style.navbar}>
          {
            categories.map((el) => (
              <p onClick={() => handleCategoryClick(el.strCategory)}>{el.strCategory}</p>
            ))
          }
        </div>
        <CardDetail details={details} meals={meals} />
        <Cards names={names} details={details} />
      </div>
    </div>
  )
}

export default Home