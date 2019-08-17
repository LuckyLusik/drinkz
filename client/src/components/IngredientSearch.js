import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const LIST_QUERY = gql`
  query ListQuery {
    list {
        strIngredient1
    }
  }
`;

function IngredientSearch(props) {
    const onClick = (n) => {
        props.history.push(`/ingredients/${n}`);
    };
    const { data, loading, error } = useQuery(LIST_QUERY);
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
        <div>
            <h4>Just choose ingredient from this list:</h4>
                {data.list.map(name => (<p key={name.strIngredient1 + 100} onClick={() => onClick(name.strIngredient1)}>{name.strIngredient1}</p>))}
        </div>
    )
}

export default withRouter(IngredientSearch);