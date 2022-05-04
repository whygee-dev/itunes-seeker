import Constants from "expo-constants";

const { manifest } = Constants;
export const API_URI = Constants?.manifest?.extra?.api || `http://${manifest?.debuggerHost?.split(":").shift()}:3000`;
export const FILTERS = [
  {
    name: "music",
    display: "Music",
  },
  {
    name: "musicVideo",
    display: "Music Video",
  },
  {
    name: "podcast",
    display: "Podcast",
  },
  {
    name: "movie",
    display: "Movie",
  },

  {
    name: "audiobook",
    display: "Audio Book",
  },

  {
    name: "tvShow",
    display: "TV Show",
  },
];
