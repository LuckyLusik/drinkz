import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NotFoundPage from './NotFoundPage';

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

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    margin: {
        margin: '8px 0',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
  }));

function Cocktail({ match: { params: { idDrink }}, history }) {
    const classes = useStyles();
    const { data, loading, error } = useQuery(COCKTAIL_QUERY, { variables: { idDrink } });
    if (loading) return <h4>Loading...</h4>;
    if (error) return <NotFoundPage />;
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
        if(data.cocktail[ingredientName]){
            measureName += i;
            ingredientName = data.cocktail[measureName] + " " + data.cocktail[ingredientName];
            ingredientsList.push(ingredientName);
            ingredientName = "strIngredient";
            measureName = "strMeasure";
        } else i = 16;
    }
    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <h4 className='margin-t'>Drink: <i style={{ color: '#DD7A62' }}>{ strAlcoholic }</i></h4>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='ingredient-description-title' style={{ margin: '29px 0' }}>{strDrink}</div>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <img className='margin-b-20' src={strDrinkThumb} alt="Cocktail" style={{ width: '100%', height: 'auto'}}></img>
                    </Grid>
                    <Grid className='margin-l' item xs={12} sm={5}>
                        <h4 className='h4-800' style={{ marginTop: 0 }}>Ingredients:</h4>
                        <div>
                            {
                                ingredientsList.map(ingSingle => (
                                    <p style={{ color: '#333e4b'}}key={ ingSingle + 1000 }>{ ingSingle }</p>
                                ))
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h4 className='h4-800' style={{ marginTop: '2.7vw' }}>Instruction:</h4>
                        <p className='ingredient-description-body'>{strInstructions}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => history.goBack()} variant="outlined" size="large" color="primary" className={classes.margin}>
                            <ArrowBackIosIcon className={classes.leftIcon} />
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default withRouter(Cocktail);