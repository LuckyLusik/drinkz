import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: 0,
    },
    textField: {
      flexBasis: 200,
      width: "100%"
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
  }));

function CocktailSearch(props) {
    const classes = useStyles();
    const [value, setValue] = useState('');
    
    const onChange = event => setValue(event.target.value);

    const reDirect = () => { 
        setValue(''); 
        props.history.push(`/cocktails/${value}`);
    };

    const keyPress = event => {
        if(event.keyCode === 13){
            setValue('');
            props.history.push(`/cocktails/${value}`);
        }
    };
    return (
        <div>
            <TextField
                id="filled-adornment-weight"
                className={clsx(classes.margin, classes.textField, 'cocktail-name-field')}
                variant="filled"
                label="Enter a Drink Name"
                value={value}
                onChange={onChange}
                onKeyDown={keyPress}
                helperText="i.e. margarita"
                InputProps={{
                endAdornment: <InputAdornment position="end">
                    <Divider className={classes.divider} />
                    <IconButton  onClick={reDirect} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>,
                }}
            />
        </div>
    )
}

export default withRouter(CocktailSearch);