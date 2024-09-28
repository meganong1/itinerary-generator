import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/globalApi";
import { PHOTO_REF_URL } from "@/service/globalApi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function PlaceCardItem({ place }) {
  const [PhotoUrl, setPhotoUrl] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedPlace, setEditedPlace] = useState(place.place);
  const [editedNotes, setEditedNotes] = useState(
    place.event_location_description
  );
  const [tempEditedPlace, setTempEditedPlace] = useState(place.place);
  const [tempEditedNotes, setTempEditedNotes] = useState(
    place.event_location_description
  );

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.place,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
  };
  const handleClose = () => {
    setTempEditedPlace(editedPlace);
    setTempEditedNotes(editedNotes);
    setIsEditOpen(false);
  };

  const handleSave = () => {
    setEditedPlace(tempEditedPlace);
    setEditedNotes(tempEditedNotes);
    setIsEditOpen(false);
  };

  return (
    <div className="shadow-md border rounded-xl p-3 mt-2 flex gap-5">
      <img src={PhotoUrl} className="w-[120px] h-[120px] rounded-xl" />
      <div>
        <h2 className="font-bold text-lg cursor-pointer">{editedPlace}</h2>
        <p>{editedNotes}</p>
        <div className="flex gap-2 mt-2">
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(editedPlace)
            }
            target="_blank"
            className=" cursor-pointer"
          >
            <Button className="mt-2">Get Directions</Button>
          </Link>
          <Button
            variant="outline"
            className="outline-1 flex items-center mt-2 cursor-pointer"
            onClick={handleEditClick}
          >
            <FaEdit className="mr-1" /> Edit
          </Button>
        </div>
      </div>

      <Sheet open={isEditOpen} onOpenChange={handleClose}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Edit Activity</SheetTitle>

            <h3>Location</h3>
            <GooglePlacesAutocomplete
              selectProps={{
                value: { label: tempEditedPlace, value: tempEditedPlace },
                onChange: (selectedPlace) =>
                  setTempEditedPlace(selectedPlace.label),
              }}
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            />
            <h3>Notes</h3>
            <Input
              value={tempEditedNotes}
              onChange={(event) => setTempEditedNotes(event.target.value)}
              placeholder="Example: Remember to bring water, wear closed-toe shoes, and watch for wildlife along the trail."
              type="text"
            />
          </SheetHeader>
          <Button className="mt-4" onClick={handleSave}>
            Save
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default PlaceCardItem;
