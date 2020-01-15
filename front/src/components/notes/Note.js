import React from "react";
import {Card} from "reactstrap";
import "./Notes.css";

const Note = ({title, date})=>{

    return( 
    <div>
        <Card className = "btn-info px-3">
          <h4 class="text-primary">{title}</h4>
          <h5 class="text-secondary">{date}</h5>
        </Card>
    </div>
    )
  
}

export default Note;
