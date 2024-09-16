import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom"; 



function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
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
      {user ? (
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
              {user.picture && (
                <img src={user.picture} className="rounded-full h-10 w-10" alt="User" />
              )}
            </PopoverTrigger>
            <PopoverContent>
              <h2
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      )}

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="" src="/logo.svg" alt="logo" />
              <Button onClick={login} className="w-full mt-5">
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
