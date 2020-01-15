import React from "react";
import Notes from "./Notes";


const NotesList =({notes})=>{

  console.log("notesList",notes);
  const NoteComponent = notes.map((user, i)=>{
      return <Notes key = {i} title = {notes[i].props.title} date= {notes[i].props.date} />
    });
   

    return (
    <div>        
           {NoteComponent}
    </div>
    )
  }


export default NotesList;
