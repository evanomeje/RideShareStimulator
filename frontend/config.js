const gridSize = 500;
const gridCount = 50;
const squareSize = gridSize / gridCount;
const fetchInterval = 1000;
const refreshInterval = 16;
const turnDuration = refreshInterval * 8;

const config = {
  gridSize,
  gridCount,
  squareSize,
  fetchInterval,
  refreshInterval,
  turnDuration,
};

export default config;
