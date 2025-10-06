import React from "react";
import { Link } from "react-router-dom";
import defaultBackground from "../assets/image/defaultBackground.png";
import Button from "../Components/Button";

const NotFound: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url(${defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-7xl font-extrabold drop-shadow-lg">404</h1>
        <p className="text-2xl mt-4 font-medium drop-shadow-md">
          Oops! Page Not Found
        </p>

        <div className="mt-6 flex justify-center">
          <Link to="/">
            <Button size="wide" color="gradient">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
