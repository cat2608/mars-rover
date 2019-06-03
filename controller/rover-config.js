const findRovers = (instructionsChunk) => {
  const [grid, ...roversInstruction] = instructionsChunk; // eslint-disable-line no-unused-vars
  const totalRovers = [];

  for (let i = 0; i <= roversInstruction.length; i++) {
    totalRovers.push(roversInstruction.splice(0, 2));
  }

  return totalRovers;
};

module.exports = findRovers;