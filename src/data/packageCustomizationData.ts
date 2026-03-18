export interface PackageCustomizationDetails {
  includedDestinations: string[];
  includedActivities: string[];
  availableDestinations: string[];
  availableActivities: string[];
}

export const packageCustomizationData: Record<string, PackageCustomizationDetails> = {
  "romantic-radhanagar-retreat": {
    includedDestinations: ["Havelock Island", "Chidiya Tapu"],
    includedActivities: ["Candlelight Dinner", "Couples Spa", "Sunset Cruise"],
    availableDestinations: ["Havelock Island", "Neil Island", "Chidiya Tapu", "Ross Island", "North Bay Island"],
    availableActivities: ["Candlelight Dinner", "Couples Spa", "Sunset Cruise", "Beach Photography", "Snorkeling"]
  },
  "island-romance-getaway": {
    includedDestinations: ["Havelock Island", "Neil Island", "Port Blair"],
    includedActivities: ["Private Yacht Cruise", "Bioluminescent Kayaking", "Couples Photoshoot"],
    availableDestinations: ["Havelock Island", "Neil Island", "Port Blair", "North Bay Island", "Baratang Island"],
    availableActivities: ["Private Yacht Cruise", "Bioluminescent Kayaking", "Couples Photoshoot", "Scuba Diving", "Beach Picnic"]
  },
  "luxury-andaman-honeymoon": {
    includedDestinations: ["Havelock Island", "Neil Island", "Port Blair", "Ross Island"],
    includedActivities: ["Seaplane Flight", "Private Yacht Day Trip", "Overwater Villa Stay"],
    availableDestinations: ["Havelock Island", "Neil Island", "Port Blair", "Ross Island", "Long Island", "North Bay Island"],
    availableActivities: ["Seaplane Flight", "Private Yacht Day Trip", "Overwater Villa Stay", "Scuba Diving", "Private Dinner"]
  },
  "andaman-family-explorer": {
    includedDestinations: ["Port Blair", "Havelock Island"],
    includedActivities: ["Glass-bottom Boat Ride", "Cellular Jail Tour", "Beach Day Trip"],
    availableDestinations: ["Port Blair", "Havelock Island", "Neil Island", "North Bay Island", "Chidiya Tapu"],
    availableActivities: ["Glass-bottom Boat Ride", "Cellular Jail Tour", "Beach Day Trip", "Snorkeling", "Nature Walk"]
  },
  "island-hopping-family-fun": {
    includedDestinations: ["Havelock Island", "Neil Island", "Baratang Island"],
    includedActivities: ["Family Snorkeling", "Limestone Cave Trek", "Bicycle Tour"],
    availableDestinations: ["Havelock Island", "Neil Island", "Baratang Island", "Port Blair", "North Bay Island", "Rangat"],
    availableActivities: ["Family Snorkeling", "Limestone Cave Trek", "Bicycle Tour", "Kayaking", "Glass-bottom Boat Ride"]
  },
  "grand-andaman-family-vacation": {
    includedDestinations: ["Port Blair", "Havelock Island", "Neil Island", "Baratang Island"],
    includedActivities: ["Private Boat Trip", "Intro Scuba", "All-inclusive Dining"],
    availableDestinations: ["Port Blair", "Havelock Island", "Neil Island", "Baratang Island", "North Bay Island", "Long Island"],
    availableActivities: ["Private Boat Trip", "Intro Scuba", "All-inclusive Dining", "Snorkeling", "Heritage Walk"]
  },
  "thrill-seeker": {
    includedDestinations: ["Havelock Island", "Baratang Island", "Neil Island"],
    includedActivities: ["Intro Scuba", "Night Kayaking", "Jungle Trek"],
    availableDestinations: ["Havelock Island", "Baratang Island", "Neil Island", "North Bay Island", "Rangat"],
    availableActivities: ["Intro Scuba", "Night Kayaking", "Jungle Trek", "Zipline", "Sea Walk"]
  },
  "extreme-andaman-challenge": {
    includedDestinations: ["Havelock Island", "Baratang Island", "Neil Island", "Long Island"],
    includedActivities: ["PADI Certification", "Mud Volcano Trek", "Mangrove Survival Kayaking"],
    availableDestinations: ["Havelock Island", "Baratang Island", "Neil Island", "Long Island", "Diglipur", "Rangat"],
    availableActivities: ["PADI Certification", "Mud Volcano Trek", "Mangrove Survival Kayaking", "Jungle Camping", "Advanced Dive"]
  },
  "ultimate-andaman-explorer": {
    includedDestinations: ["Port Blair", "Havelock Island", "Neil Island", "Cinque Island", "Long Island"],
    includedActivities: ["Helicopter Tour", "Volcano Cruise", "Advanced Scuba"],
    availableDestinations: ["Port Blair", "Havelock Island", "Neil Island", "Cinque Island", "Long Island", "Diglipur", "Rangat"],
    availableActivities: ["Helicopter Tour", "Volcano Cruise", "Advanced Scuba", "Live-aboard Experience", "Deep Sea Fishing"]
  },
  "peaceful-andaman-escape": {
    includedDestinations: ["Port Blair", "Havelock Island"],
    includedActivities: ["Accessible Heritage Tour", "Coral Viewing", "Ayurvedic Spa"],
    availableDestinations: ["Port Blair", "Havelock Island", "Neil Island", "Chidiya Tapu", "Mount Harriet"],
    availableActivities: ["Accessible Heritage Tour", "Coral Viewing", "Ayurvedic Spa", "Gentle Beach Walk", "Sunset Viewing"]
  },
  "golden-andaman-retreat": {
    includedDestinations: ["Port Blair", "Neil Island", "Chidiya Tapu"],
    includedActivities: ["Guided Bird Walk", "Cooking Class", "Sunset Photography"],
    availableDestinations: ["Port Blair", "Neil Island", "Chidiya Tapu", "Rangat", "Mount Harriet"],
    availableActivities: ["Guided Bird Walk", "Cooking Class", "Sunset Photography", "Relaxed Cruise", "Heritage Tour"]
  },
  "premium-andaman-leisure": {
    includedDestinations: ["Port Blair", "Ross Island", "Havelock Island", "Neil Island"],
    includedActivities: ["Daily Wellness Program", "Heritage Walk", "Sunset Cruise"],
    availableDestinations: ["Port Blair", "Ross Island", "Havelock Island", "Neil Island", "Long Island", "Chidiya Tapu"],
    availableActivities: ["Daily Wellness Program", "Heritage Walk", "Sunset Cruise", "Spa Session", "Private Transfer"]
  }
};
