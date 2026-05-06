Number.prototype.round = function(places) {
  return +(Math.round(`${this}e+${places}e-${places}`));
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const wait = (t) => new Promise((res) => {
  setTimeout(() => {
    res();
  }, t);
});

const baseUrl = (
  process.env.REACT_APP_ENV === 'dev'
  ? 'http://localhost:8080'
  : 'https://app.evanomeje.xyz'
);

export const api = {};
api.get = async endpoint => {
  const res = await fetch(`${baseUrl}${endpoint}`);
  if (res.json) return await res.json();
  return res;
};
