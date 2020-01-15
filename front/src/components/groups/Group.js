import React from "react";
import { Card } from "reactstrap";

const Group = ({ name }) => {
  return (
    <div>
      <Card className="btn-info px-5">
        <h4>{name}</h4>
      </Card>
    </div>
  );
};
export default Group;
