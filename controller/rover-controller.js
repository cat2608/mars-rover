const rules = require('./rules');
const getAllRoversWithInstructions = require('./rovers');

const isDirectlyToX = orientation => (orientation === 'E' || orientation === 'W');

const isRotation = instruction => (instruction !== 'M');

const isHorizontalLimit = (nextXPosition, plateauX) => (nextXPosition > plateauX || nextXPosition < 0);

const isVerticalLimit = (nextYPosition, plateauY) => (nextYPosition > plateauY || nextYPosition < 0);

const moveRoverHorizontally = (x, orientation) => rules.moveRover[orientation](x);

const moveRoverVertically = (y, orientation) => rules.moveRover[orientation](y);

const moveRover = (plateau, x, y, orientation) => {
  const [plateauX, plateauY] = plateau;

  if (isDirectlyToX(orientation)) {
    const nextXPosition = moveRoverHorizontally(x, orientation);
    x = isHorizontalLimit(nextXPosition, plateauX) ? x : nextXPosition;
  } else {
    const nextYPosition = moveRoverVertically(y, orientation);
    y = isVerticalLimit(nextYPosition, plateauY) ? y : nextYPosition;
  }

  return [x, y, orientation];
};

const rotateRover = (instruction, orientation) => {
  return rules.cardinalDirectionsPair[orientation][instruction];
};

const moveOrRotateRover = (plateau, initialPosition, instructions) => {
  let finalPosition = [...initialPosition];

  instructions.forEach(instruction => {
    let [x, y, orientation] = finalPosition;

    if (isRotation(instruction)) {
      finalPosition = [parseInt(x), parseInt(y), rotateRover(instruction, orientation)];
    } else {
      finalPosition = moveRover(plateau, parseInt(x), parseInt(y), orientation);
    }
  });

  return finalPosition;
};

const moveAllRovers = (instructionsChunk) => {
  const [plateau, ...roversInstruction] = instructionsChunk;
  const rovers = getAllRoversWithInstructions(roversInstruction);

  let roversFinalPosition = [];
  for (let i = 0; i < rovers.length; i++) {
    let [initialPosition, instructions] = rovers[i];
    roversFinalPosition.push(moveOrRotateRover(plateau, [...initialPosition], [...instructions]));
  }
  return roversFinalPosition;
};

module.exports = { moveOrRotateRover, moveAllRovers };