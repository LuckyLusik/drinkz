import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CocktailSearch from './CocktailSearch';
import IngredientSearchMobile from './IngredientSearchMobile';
import logo from '../logo_03.png';

export default function LeftSlideMobile() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => event => {
        if (event 
            && (event.type === 'keydown' || event.type === 'mousedown' || event.type === 'click') 
            && (event.target.id === 'filled-adornment-weight' && event.target.tagName.toUpperCase() === 'INPUT')) 
            {
                if(event.which === 13 || event.keyCode === 13) {
                    setState(open);
                } else {
                    return;
            }
        } 
        setState(open);
    };

    const sideList = (
        <div className="left-main" style={{ width: '70vw', padding: '2.7vh 11.3vw' }} 
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            <Link to={'/'}>
                <img src={logo} alt="Drinkz" style={{ width: '100%', display: 'block', margin: '3.3vh auto 6.6vh auto' }} />
            </Link>
            <CocktailSearch />
            <IngredientSearchMobile />
        </div>
      );

    return (
        <div className='sandwich'>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon />
            </Button>
            <SwipeableDrawer
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {sideList}
            </SwipeableDrawer>                    
        </div>
    );
}
