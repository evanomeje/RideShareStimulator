import obstacles from '../_config/obstacles.js';

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const decide = probability => getRandomInt(1, 100) < probability;

export const wait = (t) => new Promise((res) => {
  setTimeout(() => {
    res();
  }, t);
});

export const getRoadNodes = () => {
  const coordsToObstacles = {};
  obstacles.forEach(([xStart, xEnd, yStart, yEnd]) => {
    let x = xStart;
    while (x <= xEnd) {
      let y = yStart;
      while (y <= yEnd) {
        coordsToObstacles[`${x}:${y}`] = true;
        y += 1;
      }
      x += 1;
    }
  });

  const roadNodes = [];
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      if (!coordsToObstacles[`${x}:${y}`]) {
        roadNodes.push(`${x}:${y}`);
      }
    }
  }

  return roadNodes;
};

export const findOptimalPath = (startPoint, endPoint, obstacles) => {
  // Parse coordinates
  const [startX, startY] = startPoint.split(':').map(Number);
  const [endX, endY] = endPoint.split(':').map(Number);
  
  // Convert obstacles to a Set for O(1) lookup
  const obstacleSet = new Set();
  obstacles.forEach(([xStart, xEnd, yStart, yEnd]) => {
    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        obstacleSet.add(`${x}:${y}`);
      }
    }
  });
  
  // Simplified A* pathfinding (you'll want to implement full A* here)
  // For now, return a simple direct path avoiding obstacles
  const path = [[startX, startY]];
  
  // This is where your heavy pathfinding algorithm goes
  // For demonstration, just return the start and end points
  path.push([endX, endY]);
  
  return path;
};
