import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CocktailItem from './CocktailItem';

const COCKTAILS_QUERY = gql`
  query CocktailsQuery($strDrink: String) {
    cocktails(strDrink: $strDrink) {
        idDrink
        strDrink
        strDrinkThumb
    }
  }
`;

export default function Cocktails({ match: { params: { strDrink }}}) {
    const searchDrink = strDrink;
    const { data, loading, error } = useQuery(COCKTAILS_QUERY, { variables: { strDrink } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);

    return (
        <Fragment>
            {
                data.cocktails.map(cocktail => (
                    <CocktailItem key={cocktail.idDrink} searchDrink={searchDrink} cocktail={cocktail}/>
                ))
            }
        </Fragment>
        
    )
    
}


