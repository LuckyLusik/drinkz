import React from 'react';
import DiCaprio from '../dicaprio.png'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    bigAvatar: {
      margin: 10,
      width: 200,
      height: 200,
    },
  });

export default function NoCocktails({ searchDrink }) {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography className='diCaprio'>Sorry, there is nothing for <i style={{ color: '#DD7A62'}}>{searchDrink}</i>...</Typography>
            <Avatar alt="Choose another drink" src={DiCaprio} className={classes.bigAvatar} />
            <Typography className='diCaprio'>Try something else!</Typography>
        </Grid>
    )
}
