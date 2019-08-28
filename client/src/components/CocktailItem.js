import React from 'react';
import { Link } from 'react-router-dom';

import Tilt from 'react-tilt';
import Tooltip from '@material-ui/core/Tooltip';

export default function CocktailItem({ cocktail: { idDrink, strDrink, strDrinkThumb }, searchDrink}) {
    searchDrink = `/cocktails/${searchDrink}`
    return (
        <Link to={{
            pathname: `/cocktail/${idDrink}`,
            aboutProps: { searchDrink }}}>
            <div className='overflow-hidden'>
                <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 180, width: 180 }} >
                    <div className="Tilt-inner">
                        <img src={strDrinkThumb} alt="Cocktail" style={{ width: 190, height: 190}}></img>
                    </div>
                </Tilt>
            </div>
            <Tooltip title={ strDrink } aria-label="Drink">
                <h4 className='h4-800 noWrap'>{ strDrink }</h4>
            </Tooltip>
        </Link>
    )
}
