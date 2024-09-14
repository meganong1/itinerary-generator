import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {trip?.tripData?.hotels?.map((item, index) => (
          <HotelCardItem item={item} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
