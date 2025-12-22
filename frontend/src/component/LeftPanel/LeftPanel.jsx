import React from "react";
import PlaceList from "./PlaceList";

const LeftPanel = () => {
  return (
    <div className="h-screen w-[420px] border-r overflow-hidden flex flex-col">
      <PlaceList />
    </div>
  );
};

export default LeftPanel;
