import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetPlaceDetails } from "@/service/globalApi";
import { PHOTO_REF_URL } from "@/service/globalApi";

function PlaceCardItem({ place }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.place,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="shadow-md border rounded-xl p-3 mt-2 flex gap-5">
      <img src={PhotoUrl} className="w-[120px] h-[120px] rounded-xl"></img>

      <div>
        <h2 className="font-bold text-lg cursor-pointer">{place.place}</h2>
        <p>{place.event_location_description}</p>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(place.place)
          }
          target="_blank"
          className="hover:scale-105 transition-all cursor-pointer"
        >
          <Button className="mt-2">Get Directions</Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
