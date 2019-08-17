import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import IngredientItem from './IngredientItem';
import IngredientDetails from './IngredientDetails';

const INGREDIENTS_QUERY = gql`
  query IngredientsQuery($strIngredient: String) {
    ingredients(strIngredient: $strIngredient) {
        idDrink
        strDrink
        strDrinkThumb
    }
  }
`;

export default function Ingredients({ match: { params: { strIngredient }}}) {
    let searchDrink = strIngredient;
    const { data, loading, error } = useQuery(INGREDIENTS_QUERY, { variables: { strIngredient } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
        <Fragment>
            <IngredientDetails strIngredient={strIngredient}/>
            {
                data.ingredients.map(ingredient => (
                    <IngredientItem key={ingredient.idDrink} searchDrink={searchDrink} cocktail={ingredient}/>
                ))
            }
        </Fragment>
    )
}


