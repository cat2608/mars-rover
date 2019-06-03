const test = require('tape');
const roverController = require('../controller/rover-controller');
const findRovers = require('../controller/rover-config');


test('it should move rover one position to East', (t) => {
  const initialPosition = [3, 3, 'E'];
  const instructions = ['M'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '43E', 'Rover moved one position to East');
  t.end();
});

test('it should move rover one position to West', (t) => {
  const initialPosition = [4, 3, 'W'];
  const instructions = ['M'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '33W', 'Rover moved one position to West');
  t.end();
});

test('it should rotate rover to South', (t) => {
  const initialPosition = [5, 3, 'E'];
  const instructions = ['R'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '53S', 'Rover rotated to South');
  t.end();
});

test('it should rotate rover to North', (t) => {
  const initialPosition = [5, 3, 'W'];
  const instructions = ['R'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '53N', 'Rover rotated to North');
  t.end();
});

test('it should rotate and move rover', (t) => {
  const initialPosition = [1, 2, 'N'];
  const instructions = ['L', 'M'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '02W', 'Rover follows two instructions');
  t.end();
});


test('it should move rover from given instructions', (t) => {
  const initialPosition = [3, 3, 'E'];
  const instructions = ['M','M','R','M','M','R','M','R','R','M'];
  const finalPosition = roverController.moveOrRotateRover(initialPosition, instructions).join('');
  t.equal(finalPosition, '51E', 'Rover follows more than two instructions');
  t.end();
});

test('it should extract number of rovers from instructions', (t) => {
  const instructionsChunk = ['55', '12N', 'LMLMLMLMM', '33E', 'MMRMMRMRRM'];
  const rovers = findRovers(instructionsChunk);
  t.equal(rovers.length, 2);
  t.end();
});

test('it should move all rovers', (t) => {
  const instructionsChunk = ['55', '12N', 'LMLMLMLMM', '33E', 'MMRMMRMRRM', '34W', 'MLLMRRMM'];
  const rovers = findRovers(instructionsChunk);
  const roversFinalPosition = roverController.moveAllRovers(rovers);

  const positionsExpected = ['13N', '51E', '14W'];

  for (let i = 0; i < roversFinalPosition.length; i++) {
    t.equal(roversFinalPosition[i].join(''), positionsExpected[i]);
  }

  t.end();
});