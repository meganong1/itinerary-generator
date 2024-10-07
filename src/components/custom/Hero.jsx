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
        <Button className="items-center">Let's start planning</Button>
      </Link>

      <p>
        Thanks for visiting! The site is no longer active due to the costs of
        the Places API, but you can watch the demo{" "}
        <a
          className="underline text-blue-500"
          href="https://youtu.be/iMZJ3PK59FQ?feature=shared"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}

export default Hero;
