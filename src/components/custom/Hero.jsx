import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
function Hero() {
  console.log(import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID);

  return (
    <div className="items-center flex-col flex gap-9">
      <h1 className="font-extrabold text-[50px] text-center">
        Your journey begins here!
      </h1>
      <Link to="/create-trip">
        <Button>Let's get started</Button>
      </Link>
    </div>
  );
}

export default Hero;
