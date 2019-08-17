import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const INGREDIENT_QUERY = gql`
  query IngredientQuery($strIngredient: String) {
    ingredient(strIngredient: $strIngredient) {
        idIngredient
        strIngredient
        strDescription
        strType
    }
  }
`;

export default function IngredientDetails({ strIngredient }) {
    const { data, loading, error } = useQuery(INGREDIENT_QUERY, { variables: { strIngredient } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    const {
        strDescription,
        strType
    } = data.ingredient;
    return (
        <Fragment>
            <h1>{strIngredient}</h1>
            <h4>{strType}</h4>
            <p>{strDescription}</p>
        </Fragment>
    )
}