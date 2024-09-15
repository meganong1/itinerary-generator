import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate(); 
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  // gets all trips
  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    setUserTrips([]); 
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data()); 
    });
    
    setUserTrips(trips); 
  };

  return (
    <div className = 'sm:px10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>My Trips</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 '>
        {userTrips.map((trip,index) => (
            <UserTripCardItem trip={trip}/>
        ))}


      </div>
    </div>
  );
}

export default MyTrips;
