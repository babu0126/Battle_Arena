export function randomPositionGenerator () {
  return Math.floor(Math.random() * (500));
};

export function randomColourGenerator () {
  return "#" + Math.floor(Math.random()*16777215).toString(16)
};
