import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response = await fetch("https://food-delivery-app-11c4e-default-rtdb.firebaseio.com/meals.json");
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }
    
    fetchMeals()
  },[])

  if (isLoading){
    return <section>
      <p style={{textAlign: "center", color: 'white'}}>Looading...</p>
    </section>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
