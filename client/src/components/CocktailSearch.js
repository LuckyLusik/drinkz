import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

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
    typography: {
        padding: theme.spacing(2),
    },
  }));

function CocktailSearch(props) {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClose() {
        setAnchorEl(null);
    }
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const onChange = event => setValue(event.target.value);

    const reDirect = (event) => { 
        if(value) {
            setValue(''); 
            props.history.push(`/cocktails/${value}`);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const keyPress = event => {
        if(event.keyCode === 13){
            if(value) {
                setValue('');
                props.history.push(`/cocktails/${value}`);
            } else {
                setAnchorEl(event.currentTarget);
            }
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
                helperText="i.e. a full name 'margarita' or just a part 'marg'"
                InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                    <Divider className={classes.divider} />
                    <IconButton  aria-describedby={id} onClick={reDirect} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
                }}
            />
            <Popover
                className='cocktail-field-search'
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Typography className={classes.typography}>Please, enter a drink name first.</Typography>
            </Popover>
        </div>
    )
}

export default withRouter(CocktailSearch);