import React from 'react';
import {Input} from 'reactstrap';

const SearchBox =({onChange})=>
{
    
    return(
        <div >     
             <Input
               placeholder="Search" type="text" 
                onChange = {onChange}/>
             <br></br>
             
        </div>
    );
}


export default SearchBox;