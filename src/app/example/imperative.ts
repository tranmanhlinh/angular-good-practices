const sources = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const oddList = [];

const evenList = [];

for (let i = 0; i < sources.length; i++) {
  if (sources[i] % 2 === 0) {
    evenList.push(sources[i]);
  } else {
    oddList.push(sources[i]);
  }
}
