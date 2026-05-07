Number.prototype.round = function(places) {
  return +(Math.round(`${this}e+${places}e-${places}`));
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const wait = (t) => new Promise((res) => {
  setTimeout(() => { res(); }, t);
});

// In development, use relative URL (will work with proxy)
// In production, use absolute URL
const baseUrl = process.env.REACT_APP_ENV === 'dev' ? '' : 'https://app.evanomeje.xyz';

export const api = {};
api.get = async endpoint => {
  try {
    const url = `${baseUrl}${endpoint}`;
    console.log('Fetching:', url || endpoint);
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};
