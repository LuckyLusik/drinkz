/** @jsx jsx */
import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { css, jsx } from '@emotion/core'

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: 0,
      minWidth: 120,
      maxWidth: '100%',
      width: '100%',
    },
  }));

const LIST_QUERY = gql`
  query ListQuery {
    list {
        strIngredient1
    }
  }
`;

function IngredientSearch(props) {
    const classes = useStyles();
    const [ingredientName, setIngredientName] = React.useState([]);

    function handleChangeMultiple(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setIngredientName(value);
    }

    const onClick = (n) => {
        if( n === 'A\u00f1ejo rum') {
            n = 'Anejo rum'
        }
        props.history.push(`/ingredients/${n}`);
    };
    const { data, loading, error } = useQuery(LIST_QUERY);
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
        <div>
            <h4>OR</h4>
            <h4>Choose a Drink Ingredient from the List Below:</h4>
            <FormControl className={clsx(classes.formControl, 'ingredient-name-list')}>
                <InputLabel shrink htmlFor="select-multiple-native">
                    Ingredients
                </InputLabel>
                <Select 
                    multiple
                    native
                    value={ingredientName}
                    onChange={handleChangeMultiple}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                {data.list.map(name => (
                    <option css={css`color: 'white'; &:checked { background-color: #DD7A62; }`} className='option-ingredient-list' key={name.strIngredient1 + 10} value={name.strIngredient1} onClick={() => onClick(name.strIngredient1)}>
                        {name.strIngredient1}
                    </option>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default withRouter(IngredientSearch);