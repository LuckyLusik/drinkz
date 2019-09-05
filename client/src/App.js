import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cocktails from './components/Cocktails';
import Cocktail from './components/Cocktail';
import CocktailSearch from './components/CocktailSearch';
import RandomCocktail from './components/RandomCocktail';
import IngredientSearchMobile from './components/IngredientSearchMobile';
import Ingredients from './components/Ingredients';
import NotFoundPage from './components/NotFoundPage';
import LeftSlideMobile from './components/LeftSlideMobile';
import logo from './logo_03.png';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './App.scss';

const client = new ApolloClient({
  uri: '/graphql'
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={2} className="left-main left-slide-mobile">
              <LeftSlideMobile />
            </Grid>
            <Grid item xs={10} className="right-main left-slide-mobile">
              <Switch>
                <Route exact path='/' component={RandomCocktail}></Route>
                <Route exact path='/cocktails/:strDrink' component={Cocktails}></Route>
                <Route exact path='/cocktail/:idDrink' component={Cocktail}></Route>
                <Route exact path='/ingredients/:strIngredient' component={Ingredients}></Route>
                <Route component={NotFoundPage} />
              </Switch>
            </Grid>
            <Grid item xs={4} className="left-main left-slide-desktop">
              <Link to={'/'}>
                <img src={logo} alt="Drinkz" style={{ width: '100%', display: 'block', margin: '3.3vh auto 6.6vh auto' }} />
              </Link>
              <CocktailSearch />
              <IngredientSearchMobile />
            </Grid>
            <Grid item xs={8} className="right-main left-slide-desktop">
              <Switch>
                <Route exact path='/' component={RandomCocktail}></Route>
                <Route exact path='/cocktails/:strDrink' component={Cocktails}></Route>
                <Route exact path='/cocktail/:idDrink' component={Cocktail}></Route>
                <Route exact path='/ingredients/:strIngredient' component={Ingredients}></Route>
                <Route component={NotFoundPage} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
