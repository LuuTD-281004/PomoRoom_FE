import React from "react";

type CardProps = {
  image: string;
  title: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ image, title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-60 p-3" style={{ backgroundColor: "#669DE5" }}>
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold" style={{ color: "#0234A7" }}>{title}</h3>
      <div className="mt-2 min-h-[40px]">{children}</div>
    </div>
  );
};

export default Card;
