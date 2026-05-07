import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing multiprocessing...\n');

// Spawn child process
const getDestination = fork(join(__dirname, 'getDestination.js'));
console.log(`✅ Main process PID: ${process.pid}`);
console.log(`✅ Child process PID: ${getDestination.pid}\n`);

// Send multiple requests
const requests = ['Alice', 'Bob', 'Charlie', 'Diana'];
let responses = 0;

requests.forEach((name, i) => {
  setTimeout(() => {
    console.log(`📤 Sending request from ${name}`);
    getDestination.send({ name, input: `${Date.now()}-${i}` });
  }, i * 200);
});

// Receive responses
getDestination.on('message', ({ name, destination }) => {
  responses++;
  console.log(`📨 ${name} received destination: ${destination.substring(0, 10)}...`);
  
  if (responses === requests.length) {
    console.log(`\n🎉 Test PASSED! All ${responses} requests processed by child process.`);
    getDestination.kill();
    process.exit(0);
  }
});

// Timeout
setTimeout(() => {
  console.error('❌ Test FAILED! Not all responses received.');
  getDestination.kill();
  process.exit(1);
}, 5000);
