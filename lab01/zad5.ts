async function fetchWithRetries(
  url: string,
  retries: number
): Promise<unknown> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      attempt++;

      if (attempt > retries) {
        throw new Error(
          `Failed after ${retries} retries: ${(error as Error).message}`
        );
      }

      console.warn(`Retry ${attempt}/${retries}...`);
    }
  }

  throw new Error('Unexpected error');
}

fetchWithRetries('https://api.example.com/data', 3)
  .then(data => console.log(data))
  .catch(error => console.error('Failed to fetch data:', error));
