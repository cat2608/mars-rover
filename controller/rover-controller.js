const rules = require('../tests/rules');

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

const moveOrRotateRover = (initialPosition, steps) => {
  let finalPosition = [...initialPosition];

  steps.forEach(step => {
    let [x, y, orientation] = finalPosition;
    if (isToRotateInstruction(step)) {
      finalPosition = [x, y, rotateRover(step, orientation)];
    } else {
      finalPosition = moveRover(x, y, orientation);
    }
  });

  return finalPosition;
};

module.exports = { moveOrRotateRover };