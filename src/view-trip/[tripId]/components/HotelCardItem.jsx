import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { GetPlaceDetails } from "@/service/globalApi";
import { PHOTO_REF_URL } from "@/service/globalApi";
function HotelCardItem({ item }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item.hotelName,
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        item.hotelName +
        item.hotelAddress
      }
      target="_blank"
      className="hover:scale-105 transition-all cursor-pointer"
    >
      <div>
        <img src={PhotoUrl} className="rounded-lg w-[300px] h-[200px]" />
        <div className="my-2">
          <h2 className="font-medium">{item.hotelName}</h2>
          <h2 className="text-xs text-gray-500">{item.hotelAddress}</h2>
          <h2 className="text-sm">{item.price}</h2>
          <h2 className="text-sm">⭐ {item.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
