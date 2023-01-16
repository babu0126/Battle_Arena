export function randomPositionGenerator () {
  return Math.floor(Math.random() * (500));
};

export function randomColourGenerator () {
  return "#" + Math.floor(Math.random()*16777215).toString(16)
};

export function getRandomPos(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  // The maximum is inclusive and the minimum is inclusive
}