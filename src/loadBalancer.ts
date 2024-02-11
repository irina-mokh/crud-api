import  cluster, { Worker } from 'node:cluster';
import  { availableParallelism } from 'node:os';
import  process from 'node:process';
import { requestHandler } from './index.js';
import { createServer } from 'http';

const pid = process.pid;
const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
  console.log(`Primary pid ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < availableParallelism() - 1;  i++) {
    cluster.fork({PORT: +PORT + i +1});
  }

} else {
  const id = (cluster.worker as Worker).id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);
  createServer(requestHandler);

  console.log(`Worker ${process.pid} started`);
}