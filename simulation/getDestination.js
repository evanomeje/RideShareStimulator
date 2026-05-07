import { getObstaclesSet, buildGraph, generateDestination } from './methods.js';
import { wait } from './utils.js';

const obstaclesSet = getObstaclesSet();
const graph = buildGraph(obstaclesSet);

const queue = [];

process.on('message', ({ name, location }) => {
  queue.push({ name, location });
});

const main = async () => {
  while (true) {
    if (queue.length) {
      const { name, location } = queue.shift();
      
      await wait(100);
      const destination = generateDestination(location, graph);
      
      process.send({ name, destination });
    }
    
    await wait(200);
  }
};

main();
