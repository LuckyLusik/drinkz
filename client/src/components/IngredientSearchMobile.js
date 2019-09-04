import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: 0,
      minWidth: 120,
      maxWidth: '100%',
      padding: 12,
      backgroundColor: 'white',
    },
}));

const LIST_QUERY = gql`
  query ListQuery {
    list {
        strIngredient1
    }
  }
`;

function IngredientSearchMobile(props) {
    const classes = useStyles();

    const onClick = (n) => {
        if( n === 'A\u00f1ejo rum') {
            n = 'Anejo rum';
        } else if( n === 'J\u00E4germeister'){
            n = 'Jagermeister';
        }
        props.history.push(`/ingredients/${n}`);
    };

    const { data, loading, error } = useQuery(LIST_QUERY);
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
        <div>
            <h4>OR</h4>
            <h4>Choose a Drink Ingredient from the List of <i style={{ color: '#DD7A62'}}>{data.list.length}</i> Below:</h4>
            <ul className={clsx(classes.formControl, 'ingredient-name-list')}>
                {data.list.map(name => (
                    <li 
                        className='option-ingredient-list' 
                        key={name.strIngredient1 + 10} 
                        data-id={name.strIngredient1}
                        onClick={() => onClick(name.strIngredient1)}
                    >
                        {name.strIngredient1}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default withRouter(IngredientSearchMobile);