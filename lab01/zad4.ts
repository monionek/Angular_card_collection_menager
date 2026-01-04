async function processQueue<T>(
  tasks: Array<() => Promise<T>>,
  maxConcurrent: number
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;
  let running = 0;

  return new Promise((resolve, reject) => {
    const runNext = () => {
      if (index === tasks.length && running === 0) {
        resolve(results);
        return;
      }

      while (running < maxConcurrent && index < tasks.length) {
        const task = tasks[index];
        index++;
        running++;

        task()
          .then(result => {
            results.push(result);
          })
          .catch(reject)
          .finally(() => {
            running--;
            runNext();
          });
      }
    };

    runNext();
  });
}

function createTask(id: number, delay: number): () => Promise<string> {
  return () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(`Task ${id} finished after ${delay}ms`);
      }, delay);
    });
}

const tasks = [
  createTask(1, 1000),
  createTask(2, 500),
  createTask(3, 1500),
  createTask(4, 300),
  createTask(5, 800),
];

processQueue(tasks, 2).then(results => {
  console.log(results);
});
