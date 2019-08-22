import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
  }));

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
    const classes = useStyles();
    const { data, loading, error } = useQuery(INGREDIENT_QUERY, { variables: { strIngredient } });
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    const {
        strDescription,
        strType
    } = data.ingredient;
    return (
        <Fragment>
            <h4>Ingredient: <i style={{ color: '#DD7A62'}}>{strType}</i></h4>
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className='ingredient-description-title'>{strIngredient}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className='ingredient-description-body'>
                            {strDescription ? strDescription : 'No Ingredient Description Available'}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Fragment>
    )
}