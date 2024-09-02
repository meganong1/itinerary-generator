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
          text: "Generate Travel Plan for Location : Vancouver, for 3 days for Couple with a Premium budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary (do not add label each item just leave it index) with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format\n\n",
        },
        { text: "\n" },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotels": [\n    {\n      "hotelName": "The Fairmont Pacific Rim",\n      "hotelAddress": "1038 Canada Place, Vancouver, BC V6B 4T2, Canada",\n      "price": "$500-$1000 per night",\n      "hotelImageUrl": "https://www.fairmont.com/pacific-rim/images/hotel-gallery/hero-slider/fairmont-pacific-rim-hero-slider-01.jpg",\n      "geoCoordinates": "49.2866° N, 123.1198° W",\n      "rating": 4.5,\n      "description": "A luxurious hotel with stunning views of the harbor and mountains, offering elegant rooms, world-class dining, and a rooftop pool."\n    },\n    {\n      "hotelName": "The Hotel Vancouver",\n      "hotelAddress": "900 West Georgia Street, Vancouver, BC V6Z 2K1, Canada",\n      "price": "$400-$800 per night",\n      "hotelImageUrl": "https://www.fairmont.com/vancouver/images/hotel-gallery/hero-slider/fairmont-vancouver-hero-slider-01.jpg",\n      "geoCoordinates": "49.2842° N, 123.1210° W",\n      "rating": 4.0,\n      "description": "A historic landmark hotel in the heart of downtown, offering comfortable rooms, a renowned restaurant, and a central location."\n    },\n    {\n      "hotelName": "The Sutton Place Hotel Vancouver",\n      "hotelAddress": "888 Nelson Street, Vancouver, BC V6Z 2H1, Canada",\n      "price": "$350-$700 per night",\n      "hotelImageUrl": "https://www.suttonplace.com/vancouver/images/gallery/hotel-exterior.jpg",\n      "geoCoordinates": "49.2865° N, 123.1125° W",\n      "rating": 4.2,\n      "description": "A sophisticated hotel with modern amenities, stylish rooms, and a convenient location near the waterfront and Stanley Park."\n    }\n  ],\n  "itinerary": [\n    {\n      "placeName": "Stanley Park",\n      "placeDetails": "A vast urban park with scenic seawall walks, lush forests, and a variety of attractions, including the Brockton Point Lighthouse, the Siwash Rock, and the Stanley Park Aquarium.",\n      "placeImageUrl": "https://www.stanleypark.com/images/carousel/carousel-stanley-park-sea-wall-1.jpg",\n      "geoCoordinates": "49.3073° N, 123.1544° W",\n      "ticketPricing": "Free",\n      "rating": 4.8,\n      "timeTravel": "Full day"\n    },\n    {\n      "placeName": "Granville Island Market",\n      "placeDetails": "A vibrant public market with fresh produce, seafood, artisan crafts, and delicious food stalls.",\n      "placeImageUrl": "https://www.granvilleislandmarket.com/sites/default/files/styles/large/public/images/pages/about-us/granville-island-market-aerial-view.jpg",\n      "geoCoordinates": "49.2776° N, 123.1217° W",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "Gastown",\n      "placeDetails": "Vancouver\'s historic district, known for its cobblestone streets, Victorian architecture, and trendy boutiques and restaurants.",\n      "placeImageUrl": "https://www.tourismvancouver.com/sites/default/files/styles/landscape_full_width/public/2021-09/Gastown_Cobblestones-01.jpg",\n      "geoCoordinates": "49.2824° N, 123.1173° W",\n      "ticketPricing": "Free",\n      "rating": 4.2,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "Capilano Suspension Bridge",\n      "placeDetails": "A thrilling suspension bridge spanning the Capilano River, offering breathtaking views of the rainforest canopy.",\n      "placeImageUrl": "https://www.capilanosuspensionbridge.com/media/images/homepage-hero-image.jpg",\n      "geoCoordinates": "49.3152° N, 123.1077° W",\n      "ticketPricing": "$50-$60 per person",\n      "rating": 4.7,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "Grouse Mountain",\n      "placeDetails": "A popular ski resort in the winter and a scenic hiking destination in the summer, offering stunning views of the city and surrounding mountains.",\n      "placeImageUrl": "https://www.grousemountain.com/sites/default/files/styles/homepage_hero_image/public/hero-images/2023/grouse-mountain-hero-03-987x552.jpg",\n      "geoCoordinates": "49.3221° N, 123.0821° W",\n      "ticketPricing": "$50-$60 per person",\n      "rating": 4.6,\n      "timeTravel": "Full day"\n    },\n    {\n      "placeName": "Science World",\n      "placeDetails": "An interactive science museum with hands-on exhibits, live demonstrations, and a giant OMNIMAX theatre.",\n      "placeImageUrl": "https://www.scienceworld.ca/sites/default/files/styles/hero_image/public/images/about-us/hero-gallery-img-1.jpg",\n      "geoCoordinates": "49.2765° N, 123.0992° W",\n      "ticketPricing": "$30-$40 per person",\n      "rating": 4.4,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "Vancouver Art Gallery",\n      "placeDetails": "A renowned art museum showcasing a diverse collection of contemporary and historical art.",\n      "placeImageUrl": "https://www.vanartgallery.bc.ca/sites/default/files/styles/large-gallery-image/public/2022-07/The-Vancouver-Art-Gallery-on-Robson-Street-Vancouver-BC.jpg",\n      "geoCoordinates": "49.2839° N, 123.1128° W",\n      "ticketPricing": "$20-$30 per person",\n      "rating": 4.3,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "Queen Elizabeth Park",\n      "placeDetails": "A beautiful park with stunning gardens, a Bloedel Conservatory, and panoramic city views.",\n      "placeImageUrl": "https://www.tourismvancouver.com/sites/default/files/styles/landscape_full_width/public/2020-03/Queen_Elizabeth_Park_Bloedel_Conservatory.jpg",\n      "geoCoordinates": "49.2580° N, 123.1052° W",\n      "ticketPricing": "Free",\n      "rating": 4.6,\n      "timeTravel": "Half day"\n    },\n    {\n      "placeName": "FlyOver Canada",\n      "placeDetails": "A unique immersive flight ride experience that takes you soaring over iconic Canadian landscapes.",\n      "placeImageUrl": "https://www.flyovercanada.com/sites/default/files/styles/large_mobile_hero_image/public/hero_images/flyover-canada-hero-desktop-large.jpg",\n      "geoCoordinates": "49.2816° N, 123.1181° W",\n      "ticketPricing": "$35-$45 per person",\n      "rating": 4.5,\n      "timeTravel": "Half day"\n    }\n  ],\n  "dayPlans": [\n    {\n      "day": "Day 1",\n      "plan": [\n        {\n          "time": "Morning",\n          "place": "Stanley Park"\n        },\n        {\n          "time": "Afternoon",\n          "place": "Granville Island Market"\n        },\n        {\n          "time": "Evening",\n          "place": "Gastown"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "plan": [\n        {\n          "time": "Morning",\n          "place": "Capilano Suspension Bridge"\n        },\n        {\n          "time": "Afternoon",\n          "place": "Grouse Mountain"\n        },\n        {\n          "time": "Evening",\n          "place": "Dinner at a fine dining restaurant in downtown Vancouver"\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "plan": [\n        {\n          "time": "Morning",\n          "place": "Science World"\n        },\n        {\n          "time": "Afternoon",\n          "place": "Vancouver Art Gallery"\n        },\n        {\n          "time": "Evening",\n          "place": "Queen Elizabeth Park"\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
