const axios = require('axios');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLList,
    GraphQLSchema } = require('graphql');

// Cocktail Type
const CocktailType = new GraphQLObjectType({
    name: 'Cocktail',
    fields: () => ({
        idDrink: { type: GraphQLString },
        strDrink: { type: GraphQLString },
        strAlcoholic: { type: GraphQLString },
        strCategory: { type: GraphQLString },
        strGlass: { type: GraphQLString },
        strDrinkThumb: { type: GraphQLString },
        strInstructions: { type: GraphQLString },
        strIngredient1: { type: GraphQLString },
        strIngredient2: { type: GraphQLString },
        strIngredient3: { type: GraphQLString },
        strIngredient4: { type: GraphQLString },
        strIngredient5: { type: GraphQLString },
        strIngredient6: { type: GraphQLString },
        strIngredient7: { type: GraphQLString },
        strIngredient8: { type: GraphQLString },
        strIngredient9: { type: GraphQLString },
        strIngredient10: { type: GraphQLString },
        strIngredient11: { type: GraphQLString },
        strIngredient12: { type: GraphQLString },
        strIngredient13: { type: GraphQLString },
        strIngredient14: { type: GraphQLString },
        strIngredient15: { type: GraphQLString },
        strMeasure1: { type: GraphQLString },
        strMeasure2: { type: GraphQLString },
        strMeasure3: { type: GraphQLString },
        strMeasure4: { type: GraphQLString },
        strMeasure5: { type: GraphQLString },
        strMeasure6: { type: GraphQLString },
        strMeasure7: { type: GraphQLString },
        strMeasure8: { type: GraphQLString },
        strMeasure9: { type: GraphQLString },
        strMeasure10: { type: GraphQLString },
        strMeasure11: { type: GraphQLString },
        strMeasure12: { type: GraphQLString },
        strMeasure13: { type: GraphQLString },
        strMeasure14: { type: GraphQLString },
        strMeasure15: { type: GraphQLString }
    })
});

// Ingredient Type
const IngredientType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        strDrink: { type: GraphQLString },
        strDrinkThumb: { type: GraphQLString },
        idDrink: { type: GraphQLString },
        idIngredient: { type: GraphQLString },
        strIngredient: { type: GraphQLString },
        strDescription: { type: GraphQLString }
    })
});

// Root Query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cocktails: {
            type: new GraphQLList(CocktailType),
            args: {
                strDrink: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${args.strDrink}`)
                            .then(res => res.data.drinks);
            }
        },
        cocktail: {
            type: CocktailType,
            args: {
                idDrink: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${args.idDrink}`)
                            .then(res => res.data.drinks[0]);
            }
        },
        ingredients: {
            type: new GraphQLList(IngredientType),
            args: {
                strIngredient: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${args.strIngredient}`)
                            .then(res => res.data.drinks);
            }
        },
        ingredient: {
            type: IngredientType,
            args: {
                strIngredient: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${args.strIngredient}`)
                            .then(res => res.data.ingredients[0]);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});