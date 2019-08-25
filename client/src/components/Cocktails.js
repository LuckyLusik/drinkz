import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import CocktailItem from './CocktailItem';

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
    const classes = useStyles();
    const searchDrink = strDrink;
    const { data, loading, error } = useQuery(COCKTAILS_QUERY, { variables: { strDrink } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);

    return (
        <Fragment>
            <div>
                <Badge color="primary" badgeContent={data.cocktails.length} className={classes.margin}>
                    <Typography className={clsx(classes.padding, 'drinks-word')}>Drinks for <i style={{ color: '#DD7A62'}}>{searchDrink}</i></Typography>
                </Badge>  
            </div>
            <ul className="ingredients-list-flex-container wrap">
                {
                    data.cocktails.map(cocktail => (
                        <li key={cocktail.idDrink+10} className="flex-item one-drink">
                            <CocktailItem 
                                key={cocktail.idDrink} 
                                searchDrink={searchDrink} 
                                cocktail={cocktail}
                            />
                        </li>
                    ))
                }
            </ul>
        </Fragment>
        
    )
    
}


