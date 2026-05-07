import { getRoadNodes, wait, getRandomInt, findOptimalPath } from './utils.js';
import obstacles from '../_config/obstacles.js';

const roadNodes = getRoadNodes().filter(coord => {
  const [x, y] = coord.split(':');
  return (x !== '0' && x !== '49' && y !== '0' && y !== '49');
});

const queue = [];

process.on('message', ({ name, startPoint, endPoint }) => {
  queue.push({ name, startPoint, endPoint });
});

const calculatePath = async (startPoint, endPoint) => {
  // This is where your time-consuming pathfinding algorithm would go
  // For now, simulate heavy computation
  await wait(800);
  
  // Example: Find optimal path avoiding obstacles
  // This would be your A* or Dijkstra implementation
  const path = findOptimalPath(startPoint, endPoint, obstacles);
  
  return path;
};

const main = async () => {
  while (true) {
    if (queue.length) {
      const { name, startPoint, endPoint } = queue.shift();
      
      // Time-consuming operation runs in separate process
      const path = await calculatePath(startPoint, endPoint);
      
      // Send result back to main process
      process.send({ 
        name, 
        path: JSON.stringify(path),
        startPoint,
        endPoint
      });
    }

    if (queue.length) continue;
    else await wait(200);
  }
};

main();
