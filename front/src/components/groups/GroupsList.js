import React from "react";
import Group from "./Groups"

const GroupsList = ({groups})=>{
  console.log(groups)
  const GroupComponent = groups.map((user, i)=>{
    return <Group key = {i} title = {groups[i].props.title}  />
  })
  
  return(

  <div>
    {GroupComponent}
  </div>
  
  )
  };
export default GroupsList;
