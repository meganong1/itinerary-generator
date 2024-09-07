import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

        {trip.tripData?.dayPlans?.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg gap-3">{item.day}</h2>
            {item.plan.map((place, index) => (
              <div key={index}>
                <h2 className="font-medium text-blue-800">{place.time}</h2>
                <div>
                  <PlaceCardItem className="my-3" place={place}></PlaceCardItem>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default PlacesToVisit;
