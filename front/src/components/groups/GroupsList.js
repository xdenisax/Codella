import React from "react";
import Group from "./Group";

const GroupsList = ({ groups }) => {
  console.log(groups);
  const GroupComponent = groups.map((group, i) => {
    return <Group key={i} name={groups[i].props.name} />;
  });

  return <div>{GroupComponent}</div>;
};
export default GroupsList;
