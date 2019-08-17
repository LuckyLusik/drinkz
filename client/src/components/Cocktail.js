import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const COCKTAIL_QUERY = gql`
  query CocktailQuery($idDrink: String) {
    cocktail(idDrink: $idDrink) {
        idDrink
        strDrink
        strDrinkThumb
        strAlcoholic
        strInstructions
        strIngredient1
        strIngredient2
        strIngredient3
        strIngredient4
        strIngredient5
        strIngredient6
        strIngredient7
        strIngredient8
        strIngredient9
        strIngredient10
        strIngredient11
        strIngredient12
        strIngredient13
        strIngredient14
        strIngredient15
        strMeasure1
        strMeasure2
        strMeasure3
        strMeasure4
        strMeasure5
        strMeasure6
        strMeasure7
        strMeasure8
        strMeasure9
        strMeasure10
        strMeasure11
        strMeasure12
        strMeasure13
        strMeasure14
        strMeasure15
    }
  }
`;

export default function Cocktail({ match: { params: { idDrink }}, location: { aboutProps: { searchDrink } }}) {
    const { data, loading, error } = useQuery(COCKTAIL_QUERY, { variables: { idDrink } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    const {
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strInstructions
        } = data.cocktail;
    
    let ingredientName = "strIngredient";
    let measureName = "strMeasure";
    let ingredientsList = [];
    for(let i=1; i<=15; i++) {
        ingredientName += i;
        if(data.cocktail[ingredientName] !== ""){
            measureName += i;
            ingredientName = data.cocktail[measureName] + " " + data.cocktail[ingredientName];
            ingredientsList.push(ingredientName);
            ingredientName = "strIngredient";
            measureName = "strMeasure";
        } else i = 16;
    }
    return (
        <Fragment>
            <h4>Cocktail's Name: {strDrink}</h4>
            <h4>{ strAlcoholic }</h4>
            <img src={strDrinkThumb} alt="Cocktail" style={{ width: 300, height: 300}}></img>
            <h4>Instructions: {strInstructions}</h4>
            <h4>Ingredients:</h4>
            <div>
                {
                    ingredientsList.map(ingSingle => (
                        <p key={ ingSingle + 1000 }>{ ingSingle }</p>
                    ))
                }
            </div>
            <Link to={`${searchDrink}`}>Back</Link>
        </Fragment>
    )
}

