//using unique id library.
import { v4 as uuidv4 } from "uuid";

const songsData = () => {
  return [
    {
      id: uuidv4(),
      name: "Company Levia",
      artist: "Leavv, Maduk",
      color: ["#5E5E42", "#FCF2BD"],
      cover:
        "https://chillhop.com/wp-content/uploads/2023/09/8f757904ef61a59fa3d564074e4834c1fb0af2e7-1024x1024.jpg",
      audio: "https://stream.chillhop.com/mp3/65377",
      active: true,
    },
    {
      id: uuidv4(),
      name: "ranni fluff",
      artist: "Ward Wills",
      color: ["#234A5F", "#BACDDA"],
      cover:
        "https://chillhop.com/wp-content/uploads/2023/10/e3a51ef1515665232dae9c9d02d3689d2e7611ff-1024x1024.jpg",
      audio: "https://stream.chillhop.com/mp3/69899",
      active: false,
    },
    {
      id: uuidv4(),
      name: "Winter Shore",
      artist: "Leavv",
      color: ["#543650", "#635E85"],
      cover:
        "https://chillhop.com/wp-content/uploads/2023/10/0a2c6003af19a23e13b38661569898344d7590a1-1024x1024.jpg",
      audio: "https://stream.chillhop.com/mp3/65377",
      active: false,
    },
    {
      id: uuidv4(),
      name: "Stay",
      artist: "Yasper skie",
      color: ["#A0B92C", "#527F88"],
      cover:
        "https://chillhop.com/wp-content/uploads/2023/10/4945cd7e50ca1777035c994140f6aaa70e6df5fb-1024x1024.jpg",
      audio: "https://stream.chillhop.com/mp3/65411",
      active: false,
    },
  ];
};

export default songsData;
