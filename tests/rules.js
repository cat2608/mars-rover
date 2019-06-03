const moveRover = {
  E: x => x + 1,
  S: y => y - 1,
  W: x => x - 1,
  N: y => y + 1,
};

const cardinalDirectionsPair = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' },
};

module.exports = {
  cardinalDirectionsPair,
  moveRover
};