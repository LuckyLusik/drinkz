import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function CocktailSearch(props) {
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
            <h4>Enter cocktail name</h4>
            <input placeholder="i.e. margarita" value={value} type="text" onChange={onChange} onKeyDown={keyPress} />
            <button onClick={reDirect}>Go for it!</button>
        </div>
    )
}

export default withRouter(CocktailSearch);