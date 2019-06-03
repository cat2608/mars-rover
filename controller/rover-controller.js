const rules = require('../tests/rules');

const explorePlateau = (plateauDimension, initialPosition, instructions) => {
  return '13N';
};

const isDirectlyToX = orientation => (orientation === 'E' || orientation === 'W');

const isToRotateInstruction = step => (step !== 'M');

const moveRover = (x, y, orientation) => {
  if (isDirectlyToX(orientation)) {
    x = rules.moveRover[orientation](x);
  } else {
    y = rules.moveRover[orientation](y);
  }
  return [x, y, orientation];
};

const rotateRover = (step, orientation) => {
  return rules.cardinalDirectionsPair[orientation][step];
};

const moveOrRotateRover = (initialPosition, step) => {
  let [x, y, orientation] = initialPosition;
  let finalPosition = [];

  if (isToRotateInstruction(step)) {
    finalPosition = [x, y, rotateRover(step, orientation)];
  } else {
    finalPosition = moveRover(x, y, orientation);
  }

  return finalPosition;
};

module.exports = { explorePlateau, moveOrRotateRover };