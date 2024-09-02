import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {trip?.tripData?.hotels?.map((item, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              item.hotelName +
              item.hotelAddress
            }
            target="_blank"
            className="hover:scale-105 transition-all cursor-pointer"
          >
            <div>
              <img src={"/placeholder.svg"} className="rounded-lg" />
              <div className="my-2">
                <h2 className="font-medium">{item.hotelName}</h2>
                <h2 className="text-xs text-gray-500">{item.hotelAddress}</h2>
                <h2 className="text-sm">{item.price}</h2>
                <h2 className="text-sm">⭐ {item.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
