import React from "react";
import Note from "./Note";

const NotesList = ({ notes, f }) => {
  const NoteComponent = notes.map((note, i) => {
    return (
      <Note
        key={i}
        title={notes[i].props.title}
        date={notes[i].props.date}
        id={notes[i].props.id}
        click={() => f(notes[i].props.id)}
      />
    );
  });

  return <div>{NoteComponent}</div>;
};

export default NotesList;
