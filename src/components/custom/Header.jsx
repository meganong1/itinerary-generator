import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLoginStatusChange }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [isLoggedIn]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        onLoginStatusChange(true);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-5 shadow-sm flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <Link to="/create-trip">
            <Button variant="outline" className="outline-1">
              Add Trip
            </Button>
          </Link>
          <Link to="/my-trips">
            <Button variant="outline" className="outline-1">
              My Trips
            </Button>
          </Link>

          <Popover>
            <PopoverTrigger>
              {user?.picture && (
                <img
                  src={user.picture}
                  className="rounded-full h-10 w-10"
                  alt="User"
                />
              )}
            </PopoverTrigger>
            <PopoverContent>
              <h2
                className="cursor-pointer"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  setUser(null);
                  onLoginStatusChange(false); 
                }}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={login}>Sign In</Button>
      )}
    </div>
  );
}

export default Header;
