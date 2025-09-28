import React from "react";

const MapTooltip = ({ content, position }) => {
  if (!content) return null;

  const style = {
    left: `${position.x + 15}px`,
    top: `${position.y}px`,
  };

  return (
    <div
      id="tooltip"
      style={style}
      className="absolute z-50 px-3 py-1 bg-gray-800 text-white text-sm rounded shadow-lg border border-gray-700 pointer-events-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MapTooltip;