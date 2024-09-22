import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip({ isLoggedIn }) {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((formField) => ({
      ...formField,
      [name]: value,
    }));
  };

  const onGenerateTrip = async () => {
    if (!isLoggedIn) {
      toast("Please sign in");
      return;
    }

    if (
      !formData.numberOfDays ||
      !formData.location ||
      !formData.budget ||
      !formData.groupType
    ) {
      toast("Please fill all details");
      return;
    }

    if (formData.numberOfDays <= 0) {
      toast("Please enter 1 or more days")
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{numberOfDays}", formData.numberOfDays)
      .replace("{groupType}", formData.groupType)
      .replace("{budget}", formData.budget)
      .replace("{numberOfDays}", formData.numberOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      SaveAiTrip(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (tripData) => {
    const docID = Date.now().toString();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const parsedTripData = JSON.parse(tripData);

      await setDoc(doc(db, "AITrips", docID), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docID,
      });
      console.log("Trip saved successfully!");
    } catch (error) {
      console.error("Trip not saved. Error:", error);
      toast.error("Trip not saved.");
    } finally {
      navigate("/view-trip/" + docID); //redirect
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Add Travel Preferences</h2>
      <div>
        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleChange("location", v);
              },
            }}
          />
        </div>

        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">Trip duration in day(s)</h2>
          <Input
            onChange={(event) =>
              handleChange("numberOfDays", event.target.value)
            }
            placeholder="Example: 4"
            type="number"
            min="1"
            max="7"
          />
        </div>

        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">Budget</h2>
          <div className="grid grid-cols-3 gap-5 cursor-pointer">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-xl my-3 font-medium">Group Type</h2>
          <div className="grid grid-cols-4 gap-5 cursor-pointer">
            {SelectTravelesList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleChange("groupType", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData?.groupType === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="justify-end flex my-5">
          <Button onClick={onGenerateTrip} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip!"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
