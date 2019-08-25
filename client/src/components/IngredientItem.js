import React from 'react';
import { Link } from 'react-router-dom';

import Tilt from 'react-tilt';

export default function IngredientItem({ cocktail: { idDrink, strDrink, strDrinkThumb }, searchDrink}) {
    searchDrink = `/ingredients/${searchDrink}`
    return (
                <Link to={{
                    pathname: `/cocktail/${idDrink}`,
                    aboutProps: { searchDrink }}} 
                    >
                    <div className='overflow-hidden'>
                        <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 180, width: 180 }} >
                            <div className="Tilt-inner">
                                <img src={strDrinkThumb} alt="Cocktail" style={{ width: 190, height: 190}}></img>
                            </div>
                        </Tilt>
                    </div>
                    <h4 className='h4-800'>{ strDrink }</h4>
                </Link>
            
    )
}
