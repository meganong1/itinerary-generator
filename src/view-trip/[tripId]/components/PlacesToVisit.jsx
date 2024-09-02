import React from "react";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      {/* {trip.tripData?.itinerary?.map((item, index) => (
        <div key={index}>
          <h2>{item.day}</h2>
          {item.plan.map((place,index) => (
            <div>
                <h2>{item.placeName}</h2>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}

export default PlacesToVisit;
