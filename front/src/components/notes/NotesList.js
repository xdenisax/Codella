import React from "react";
import Note from "./Note";


const NotesList =({notes})=>{

  
  const NoteComponent = notes.map((user, i)=>{
      return <Note key = {i} title = {notes[i].props.title} date= {notes[i].props.date} />
    });
   

    return (
    <div>        
           {NoteComponent}
    </div>
    )
  }


export default NotesList;
