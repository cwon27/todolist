import { FC } from "react";
import { Outlet } from "react-router-dom";

const About: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <Outlet />
    </div>
  );
};

export default About;
