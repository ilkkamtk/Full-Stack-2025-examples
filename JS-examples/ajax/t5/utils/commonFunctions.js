const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Error from the server:' + response.status);
  }
  const data = await response.json();
  return data;
};

export { fetchData };
