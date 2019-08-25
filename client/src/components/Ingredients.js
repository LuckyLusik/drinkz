import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import IngredientItem from './IngredientItem';
import IngredientDetails from './IngredientDetails';

import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(2),
      marginLeft: 0,
    },
    padding: {
      padding: theme.spacing(0, 2),
      paddingLeft: 0,
    },
  }));

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
    const classes = useStyles();
    let searchDrink = strIngredient;
    const { data, loading, error } = useQuery(INGREDIENTS_QUERY, { variables: { strIngredient } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
        <Fragment>
            <IngredientDetails strIngredient={strIngredient}/>
            <div>
                <Badge color="primary" badgeContent={data.ingredients.length} className={classes.margin}>
                    <Typography className={clsx(classes.padding, 'drinks-word')}>Drinks</Typography>
                </Badge>  
            </div>
            <ul className="ingredients-list-flex-container wrap">
                {
                    data.ingredients.map(ingredient => (
                        <li key={ingredient.idDrink+10} className="flex-item one-drink">
                            <IngredientItem 
                                key={ingredient.idDrink} 
                                searchDrink={searchDrink} 
                                cocktail={ingredient}
                            />
                        </li>
                    ))
                }
            </ul>
        </Fragment>
    )
}


