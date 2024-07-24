// components/Loader.tsx
import React from "react";
import "../css/loader/loader.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </>
  );
};

export default Loader;
