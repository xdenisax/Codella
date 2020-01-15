import React from 'react';
import {Input} from 'reactstrap';

const SearchBox =({onChange})=>
{
    
    return(
        <div >     
             <Input
               placeholder="Search" type="text" 
                onChange = {onChange}/>
            />
             
        </div>
    );
}


export default SearchBox;