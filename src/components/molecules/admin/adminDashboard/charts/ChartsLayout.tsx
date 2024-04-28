import React from "react";

interface props {
  children: React.ReactNode;
}

const ChartsLayout: React.FC<props> = ({ children }) => {
  return (
    <div className="w-65.5 h-65.5 bg-white py-3.5 px-3 flex flex-col rounded-2.5">
      {children}
    </div>
  );
};

export default ChartsLayout;
