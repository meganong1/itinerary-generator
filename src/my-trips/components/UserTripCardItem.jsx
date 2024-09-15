import React, { useState, useEffect } from "react";
import { GetPlaceDetails } from "@/service/globalApi";
import { PHOTO_REF_URL } from "@/service/globalApi";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const resp = await GetPlaceDetails(data);
    if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    }
  };

  return (
    <div>
      <Link to={'/view-trip/' + trip.id}>
        <div className='hover:scale-105 transition-all'>


        <img
          className="object-cover rounded-xl align-middle aspect-square"
          src={PhotoUrl ? PhotoUrl : "/placeholder.svg"}
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="text-gray-500">
            <h3>Duration: {trip?.userSelection?.numberOfDays} days</h3>
            <h3>Budget: {trip?.userSelection?.budget}</h3>
            <h3>Group Type: {trip?.userSelection?.groupType}</h3>
          </div>
        </div>
        </div>

      </Link>
    </div>
  );
}

export default UserTripCardItem;
