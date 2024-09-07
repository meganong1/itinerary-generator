import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/service/firebaseConfig";
import { useEffect } from "react";
import InfoSection from "./components/InfoSection";
import { useState } from "react";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // get info from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("Document doesnt exist");
      toast("No trip found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip}> </InfoSection>
      <Hotels trip={trip}></Hotels>
      <PlacesToVisit trip={trip}></PlacesToVisit>
    </div>
  );
}

export default Viewtrip;
