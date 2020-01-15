import React from "react";
import {Card} from "reactstrap";


const Groups = ({title})=>{
  return(
     <div>
       <Card className = "btn-info px-3">
       <h4>{title}</h4>
       </Card>    
     </div>
  );
  }
export default Groups;
