const getAllRoversWithInstructions = (roversInstruction) => {
  const length = roversInstruction.length / 2;
  const totalRovers = [];

  for (let i = 0; i < length; i++) {
    totalRovers.push(roversInstruction.splice(0, 2));
  }

  return totalRovers;
};

module.exports = getAllRoversWithInstructions;