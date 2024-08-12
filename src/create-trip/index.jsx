import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function CreateTrip() {
  const [place, setPlace] = React.useState();
  const [formData, setFormData] = React.useState([]);

  function handleChange(name, value) {
    setFormData((formField) => ({
      ...formField,
      [name]: value,
    }));
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function onGenerateTrip() {
    console.log(formData);
  }

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
              handleChange("numberofDays", event.target.value)
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
                  formData?.budget == item.title && "shadow.lg border-black"
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
                  formData?.groupType == item.title && "shadow.lg border-black"
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
          <Button onClick={onGenerateTrip}>Generate Trip!</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
