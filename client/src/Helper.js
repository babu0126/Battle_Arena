export function randomRoomGenerator () {
  return Math.random().toString(36).substring(2, 8)
};

const colours = ["red", "green", "blue", "yellow"];

export default function getRandomColour() {
  const index = Math.floor(Math.random() * colours.length);
  return colours[index];
}