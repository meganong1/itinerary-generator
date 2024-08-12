/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Vancouver, for 3 days for Couple with a Premium budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The Fairmont Pacific Rim",\n      "hotelAddress": "1038 Canada Place, Vancouver, BC V6B 4T1, Canada",\n      "price": "From $500 per night",\n      "hotelImageUrl": "https://www.fairmont.com/pacific-rim/images/hotel-exterior/hotel-exterior-day-gallery-1.jpg",\n      "geoCoordinates": "49.2852, -123.1208",\n      "rating": 4.5,\n      "description": "A luxurious hotel with stunning views of the city and harbor. Features a rooftop pool, spa, and multiple dining options."\n    },\n    {\n      "hotelName": "The Sutton Place Hotel Vancouver",\n      "hotelAddress": "845 Burrard Street, Vancouver, BC V6Z 2K8, Canada",\n      "price": "From $400 per night",\n      "hotelImageUrl": "https://www.suttonplace.com/vancouver/wp-content/uploads/sites/15/2020/02/Sutton-Place-Hotel-Vancouver-Exterior-1-scaled.jpg",\n      "geoCoordinates": "49.2856, -123.1173",\n      "rating": 4.2,\n      "description": "A stylish and sophisticated hotel in the heart of downtown. Offers a rooftop patio, fitness center, and upscale restaurant."\n    },\n    {\n      "hotelName": "The Rosewood Hotel Georgia",\n      "hotelAddress": "801 Georgia Street West, Vancouver, BC V6Z 2H6, Canada",\n      "price": "From $600 per night",\n      "hotelImageUrl": "https://www.rosewoodhotels.com/en/rosewood-georgia/images/hotel-overview/rosewood-georgia-hotel-exterior-0001.jpg",\n      "geoCoordinates": "49.2846, -123.1153",\n      "rating": 4.8,\n      "description": "A historic landmark hotel known for its elegance and exceptional service. Features a renowned spa, fine dining, and a glamorous atmosphere."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "placeName": "Stanley Park",\n        "placeDetails": "Explore the iconic park with its lush forests, scenic seawall, and the famous Siwash Rock. Rent a bike or take a leisurely stroll.",\n        "placeImageUrl": "https://www.stanleypark.com/wp-content/uploads/2016/08/StanleyPark.jpg",\n        "geoCoordinates": "49.3089, -123.1607",\n        "ticketPricing": "Free",\n        "rating": 4.8,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Morning for cooler temperatures and fewer crowds"\n      },\n      "afternoon": {\n        "placeName": "Granville Island Market",\n        "placeDetails": "Experience the vibrant market with its fresh produce, artisanal goods, and diverse food stalls. Enjoy lunch with a view of the harbor.",\n        "placeImageUrl": "https://www.granvilleisland.com/media/images/granville-island-market-photo-large.jpg",\n        "geoCoordinates": "49.2791, -123.1282",\n        "ticketPricing": "Free",\n        "rating": 4.6,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Afternoon for a lively atmosphere and diverse food options"\n      },\n      "evening": {\n        "placeName": "Gastown",\n        "placeDetails": "Stroll through the historic district with its cobblestone streets, Victorian architecture, and trendy restaurants. Enjoy dinner at one of the upscale dining options.",\n        "placeImageUrl": "https://www.tourismvancouver.com/sites/default/files/styles/large_gallery_image/public/images/2018-04/Gastown-shutterstock_1027140371.jpg?itok=X96G44gD",\n        "geoCoordinates": "49.2860, -123.1162",\n        "ticketPricing": "Free",\n        "rating": 4.4,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Evening for a romantic ambiance and lively nightlife"\n      }\n    },\n    "day2": {\n      "morning": {\n        "placeName": "Capilano Suspension Bridge",\n        "placeDetails": "Experience the thrill of crossing the iconic bridge suspended over the Capilano River. Explore the surrounding rainforest and enjoy breathtaking views.",\n        "placeImageUrl": "https://www.capilanosuspensionbridge.com/media/img/hero-images/capilano-suspension-bridge-hero-image.jpg",\n        "geoCoordinates": "49.3062, -123.0436",\n        "ticketPricing": "Around $50 per person",\n        "rating": 4.5,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Morning for cooler temperatures and fewer crowds"\n      },\n      "afternoon": {\n        "placeName": "Grouse Mountain",\n        "placeDetails": "Take the scenic gondola to the top of Grouse Mountain for panoramic views of Vancouver and the surrounding area. Enjoy hiking trails, a wildlife refuge, and a variety of activities.",\n        "placeImageUrl": "https://www.grousemountain.com/media/images/grouse-mountain-hero.jpg",\n        "geoCoordinates": "49.3214, -123.0704",\n        "ticketPricing": "Around $60 per person",\n        "rating": 4.7,\n        "timeTravel": "3-4 hours",\n        "bestTime": "Afternoon for sunny weather and stunning views"\n      },\n      "evening": {\n        "placeName": "Vancouver Aquarium",\n        "placeDetails": "Discover marine life from around the world at the Vancouver Aquarium. See beluga whales, sea otters, jellyfish, and more.",\n        "placeImageUrl": "https://www.vanaqua.org/sites/default/files/styles/hero_image/public/hero-images/aquarium-hero-image-web-2.jpg?itok=7sI1b1q3",\n        "geoCoordinates": "49.2929, -123.1297",\n        "ticketPricing": "Around $40 per person",\n        "rating": 4.3,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Evening for a more relaxed experience"\n      }\n    },\n    "day3": {\n      "morning": {\n        "placeName": "Queen Elizabeth Park",\n        "placeDetails": "Visit the beautiful park with its stunning gardens, Bloedel Conservatory, and panoramic city views. Enjoy a picnic or stroll through the lush greenery.",\n        "placeImageUrl": "https://www.vancouver.ca/files/2018/01/Queen-Elizabeth-Park-Bloedel-Conservatory.jpg",\n        "geoCoordinates": "49.2582, -123.1029",\n        "ticketPricing": "Free",\n        "rating": 4.6,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Morning for a peaceful and serene experience"\n      },\n      "afternoon": {\n        "placeName": "Robson Street",\n        "placeDetails": "Explore the bustling shopping street with its high-end boutiques, designer stores, and local shops. Enjoy lunch at one of the many restaurants and cafes.",\n        "placeImageUrl": "https://www.tourismvancouver.com/sites/default/files/styles/large_gallery_image/public/images/2017-12/Robson-Street-shutterstock_1282358969.jpg?itok=6s7X178l",\n        "geoCoordinates": "49.2852, -123.1135",\n        "ticketPricing": "Free",\n        "rating": 4.4,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Afternoon for a vibrant and lively atmosphere"\n      },\n      "evening": {\n        "placeName": "Yaletown",\n        "placeDetails": "Dine at one of the trendy restaurants and bars in Yaletown, known for its chic atmosphere and upscale dining options. Enjoy a relaxing evening with a waterfront view.",\n        "placeImageUrl": "https://www.tourismvancouver.com/sites/default/files/styles/large_gallery_image/public/images/2016-04/Yaletown.jpg?itok=466V4t3o",\n        "geoCoordinates": "49.2799, -123.1139",\n        "ticketPricing": "Free",\n        "rating": 4.5,\n        "timeTravel": "2-3 hours",\n        "bestTime": "Evening for a lively and romantic atmosphere"\n      }\n    }\n  }\n}\n```',
        },
      ],
    },
  ],
});
