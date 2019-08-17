import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function CocktailSearch(props) {
    const [value, setValue] = useState('i.e. margarita');
    
    const onChange = event => setValue(event.target.value);

    const reDirect = () => { 
        setValue(''); 
        props.history.push(`/cocktails/${value}`);
    };

    const onClick = () => {
        if(value === 'i.e. margarita') {
            setValue(''); 
        }
    };

    const keyPress = event => {
        if(event.keyCode === 13){
            setValue('');
            props.history.push(`/cocktails/${value}`);
        }
    };
    return (
        <div>
            <h4>Enter cocktail name</h4>
            <input value={value} type="text" onChange={onChange} onKeyDown={keyPress} onClick={onClick}/>
            <button onClick={reDirect}>Go for it!</button>
        </div>
    )
}

export default withRouter(CocktailSearch);