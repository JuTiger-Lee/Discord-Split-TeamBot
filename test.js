// 한팀에 최대 인원
const teamLimit = 5;

const persons = [
  "히다",
  "오댕",
  "이주호",
  "White",
  "독고춘화",
  "Daon",
  "Hida",
  "test1",
  "test2",
  "test3",
  "test4",
];

// a: 1 2 3 4 5
// b: 6 7 8 9 10
// c: 11

// a: 1 2 3 4 5
// b: 6 7 8 9
// c: 11 10

// a: 1 2 3 4 5
// b: 6 7 8
// c: 11 10 9

// a: 1 2 3 4
// b: 6 7 8 5
// c: 11 10 9

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
function shuffle(array) {
  const arr = array;
  arr.sort(() => Math.random() - 0.5);

  return arr;
}

const shuffleArray = shuffle(persons);

shuffleArray.forEach((item) => {});
