import React from "react";
import { Card } from "reactstrap";
import "./Notes.css";

const Note = ({ title, date, id, click }) => {
  return (
    <div onClick={click}>
      <Card className="btn-info px-5">
        <h4 className="text-primary">{title}</h4>
        <h5 className="text-secondary">{date}</h5>
      </Card>
    </div>
  );
};

export default Note;
