import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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

function CreateTrip() {
  const [place, setPlace] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleChange(name, value) {
    setFormData((formField) => ({
      ...formField,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
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
      const responseText = result.response.text();
      console.log("AI Response Text:", responseText);
      SaveAiTrip(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    try {
      const docID = Date.now().toString();
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
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="sm:px10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
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
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
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
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData?.groupType === item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleChange("groupType", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2>{item.desc}</h2>
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

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="logo" />
                <Button onClick={login} className="w-full mt-5">
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
