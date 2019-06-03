const test = require('tape');
const roverController = require('../controller/rover-controller');

const plateauDimension = '55';
const roverA = ['12N', 'LMLMLMLMM'];

test('it should move rover from given instructions', (t) => {
  const [initialPosition, instructions] = roverA;
  const finalPosition = roverController.explorePlateau(plateauDimension, initialPosition, instructions);
  t.equal(finalPosition, '13N');
  t.end();
});

test('it should move rover one position to East', (t) => {
  const initialPosition = [3, 3, 'E'];
  const step = 'M';
  const finalPosition = roverController.moveOrRotateRover(initialPosition, step).join('');
  t.equal(finalPosition, '43E');
  t.end();
});

test('it should move rover one position to West', (t) => {
  const initialPosition = [4, 3, 'W'];
  const step = 'M';
  const finalPosition = roverController.moveOrRotateRover(initialPosition, step).join('');
  t.equal(finalPosition, '33W');
  t.end();
});

test('it should rotate rover to South', (t) => {
  const initialPosition = [5, 3, 'E'];
  const step = 'R';
  const finalPosition = roverController.moveOrRotateRover(initialPosition, step).join('');
  t.equal(finalPosition, '53S');
  t.end();
});

test('it should rotate rover to North', (t) => {
  const initialPosition = [5, 3, 'W'];
  const step = 'R';
  const finalPosition = roverController.moveOrRotateRover(initialPosition, step).join('');
  t.equal(finalPosition, '53N');
  t.end();
});
