import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cocktails from './components/Cocktails';
import Cocktail from './components/Cocktail';
import './App.css';
import CocktailSearch from './components/CocktailSearch';
import RandomCocktail from './components/RandomCocktail';
import IngredientSearch from './components/IngredientSearch';
import Ingredients from './components/Ingredients';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

//const reDirect = () => <Redirect to="/cocktails/rum" />

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
        <Link to={'/'}><h1>Drinkz</h1></Link>
          <CocktailSearch />
          <h4>OR</h4>
          <IngredientSearch />
          <Route exact path='/' component={RandomCocktail}></Route>
          <Route exact path='/cocktails/:strDrink' component={Cocktails}></Route>
          <Route exact path='/cocktail/:idDrink' component={Cocktail}></Route>
          <Route exact path='/ingredients/:strIngredient' component={Ingredients}></Route>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
