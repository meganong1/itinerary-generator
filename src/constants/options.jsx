export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "1 Person",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "2 People",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "3 to 5 People",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: "4",
    title: "Friends",
    desc: "3 to 5 People",
    icon: "🎉",
    people: "3 to 5 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    icon: "💸",
  },
  {
    id: 2,
    title: "Standard",
    icon: "💳",
  },
  {
    id: 3,
    title: "Expensive",
    icon: "🏆",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {numberOfDays} days for {groupType} with a  {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary (do not add label each item just leave it index) with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format";
