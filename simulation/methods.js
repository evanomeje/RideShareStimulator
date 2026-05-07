import obstacles from '../_config/obstacles.js';
import { getRandomInt } from './utils.js';

const gridCount = 50;

export const buildGraph = (obstaclesSet) => {
  const graph = [];
  for (let y = 0; y < gridCount; y++) {
    graph[y] = [];
    for (let x = 0; x < gridCount; x++) {
      graph[y][x] = obstaclesSet.has(`${x}:${y}`) ? 0 : 1;
    }
  }
  return graph;
};

export const getObstaclesSet = () => {
  const obstaclesSet = new Set();
  obstacles.forEach(([xStart, xEnd, yStart, yEnd]) => {
    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        obstaclesSet.add(`${x}:${y}`);
      }
    }
  });
  return obstaclesSet;
};

export const getDestinationRange = (coord) => {
  return coord < gridCount / 2
    ? [gridCount / 2 + Math.floor(coord / 2), gridCount]
    : [0, gridCount / 2 - Math.floor((gridCount - coord) / 2)];
};

export const getClosestRoadNode = (x, y, graph) => {
  const isValid = (y, x) => 
    y >= 0 && y < graph.length && x >= 0 && x < graph[0].length;

  if (isValid(y, x) && graph[y][x] === 1) return [x, y];

  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let queue = [[y, x]];
  const seen = new Set([`${y}:${x}`]);

  while (queue.length) {
    const nextQueue = [];
    
    for (const [y, x] of queue) {
      for (const [dx, dy] of directions) {
        const nextY = y + dy;
        const nextX = x + dx;

        if (isValid(nextY, nextX) && !seen.has(`${nextY}:${nextX}`)) {
          if (graph[nextY][nextX] === 1) return [nextX, nextY];
          seen.add(`${nextY}:${nextX}`);
          nextQueue.push([nextY, nextX]);
        }
      }
    }
    queue = nextQueue;
  }
  
  return [x, y];
};

export const generateDestination = (startPoint, graph) => {
  const [startX, startY] = startPoint;
  const rangeX = getDestinationRange(startX);
  const rangeY = getDestinationRange(startY);

  const destX = getRandomInt(rangeX[0], rangeX[1]);
  const destY = getRandomInt(rangeY[0], rangeY[1]);

  return getClosestRoadNode(destX, destY, graph);
};
