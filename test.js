const x = {
  name: "A",
  monHoc: [
    {
      name: "Toan",
      score: 10,
    },
    {
      name: "TV",
      score: 8,
    },
    {
      name: "EN",
      score: 8,
    },
  ],
};

const a = x.monHoc.map((item) => {
  return item.score;
});
const scores = a.filter(function (item, pos) {
  return a.indexOf(item) === pos;
});
console.log(scores);
// => [10, 8]
