import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/service/firebaseConfig";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";

function ViewTrip() {
  const { tripId } = useParams(); 
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    if (tripId) {
      GetTripData(); 
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data()); 
      } else {
        setError("No trip found with the ID provided");
        toast.error("No trip found");
      }
    } catch (error) {
      setError("Failed to get trip data");
      toast.error("Failed to get trip data");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {trip && (
        <div>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <PlacesToVisit trip={trip} />
        </div>
      )}
    </div>
  );
}

export default ViewTrip;
