import React from 'react';
import { Link } from 'react-router-dom';

export default function CocktailItem({ cocktail: { idDrink, strDrink, strDrinkThumb }, searchDrink}) {
    searchDrink = `/cocktails/${searchDrink}`
    return (
        <Link to={{
            pathname: `/cocktail/${idDrink}`,
            aboutProps: { searchDrink }}}>
            <img src={strDrinkThumb} alt="Cocktail" style={{ width: 190, height: 190}}></img>
            <h4>{ strDrink }</h4>
        </Link>
    )
}
