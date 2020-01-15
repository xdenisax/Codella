import React from "react";
import Group from "./Group";

const GroupsList = ({ groups, f }) => {
  console.log(groups);
  const GroupComponent = groups.map((group, i) => {
    return (
      <Group
        key={i}
        name={groups[i].props.name}
        click={() => f(groups[i].props.id)}
      />
    );
  });

  return <div>{GroupComponent}</div>;
};
export default GroupsList;
