import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Oops! This page doesn't exist.</p>
      <img
        src="https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif"
        alt="Funny 404"
        className="mt-4"
      />
    </div>
  );
};

export default NotFound;