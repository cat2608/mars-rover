const rules = require('../tests/rules');

const isDirectlyToX = orientation => (orientation === 'E' || orientation === 'W');

const isToRotateInstruction = instruction => (instruction !== 'M');

const moveRover = (x, y, orientation) => {
  if (isDirectlyToX(orientation)) {
    x = rules.moveRover[orientation](x);
  } else {
    y = rules.moveRover[orientation](y);
  }
  return [x, y, orientation];
};

const rotateRover = (instruction, orientation) => {
  return rules.cardinalDirectionsPair[orientation][instruction];
};

const moveOrRotateRover = (initialPosition, instructions) => {
  let finalPosition = [...initialPosition];

  instructions.forEach(instruction => {
    let [x, y, orientation] = finalPosition;

    if (isToRotateInstruction(instruction)) {
      finalPosition = [parseInt(x), parseInt(y), rotateRover(instruction, orientation)];
    } else {
      finalPosition = moveRover(parseInt(x), parseInt(y), orientation);
    }
  });

  return finalPosition;
};

const moveAllRovers = (rovers) => {
  let roversFinalPosition = [];
  for (let i = 0; i < rovers.length; i++) {
    let [initialPosition, instructions] = rovers[i];
    roversFinalPosition.push(moveOrRotateRover([...initialPosition], [...instructions]));
  }
  return roversFinalPosition;
};

module.exports = { moveOrRotateRover, moveAllRovers };