import React from "react";
import { Button } from "@/components/ui/button";
import { GrShareOption } from "react-icons/gr";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/globalApi";
import { PHOTO_REF_URL } from "@/service/globalApi";

function InfoSection({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);

  }

  return (
    <div>
      <img
        src={PhotoUrl}
        className="h-[340px] w-full object-cover rounded-md"
      />

      <h2 className="font-bold text-2xl mt-4">
        {trip?.userSelection?.location?.label}
      </h2>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 my-5">
          <h2 className="text-sm p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            Number of Days: {trip?.userSelection?.numberOfDays}
          </h2>

          <h2 className="text-sm p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            Budget: {trip?.userSelection?.budget}
          </h2>

          <h2 className="text-sm p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            Group Type: {trip?.userSelection?.groupType}
          </h2>
        </div>

        <Button onClick={handleShare} disabled={isLinkCopied}>
          {isLinkCopied ? (
            "Link copied to clipboard"
          ) : (
            <>
              <GrShareOption /> Share
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
