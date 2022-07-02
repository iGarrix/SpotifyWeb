import React from "react";
import { Helmet } from "react-helmet";

export const NotFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Helmet>
        <title>Soundwave | Not found, go back</title>
      </Helmet>
      <h1 className="font-bold text-3xl">NotFound</h1>
    </div>
  );
};
