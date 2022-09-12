// 한팀당 최대 인원이 5명일 때
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
 * @returns
 */
function shuffle(array) {
  const shuffleArr = array;

  shuffleArr.sort(() => Math.random() - 0.5);

  return shuffleArr;
}

/**
 *
 * @param {Array} teams
 * @param {Number} teamLimit
 */
function makeTeam(teams, teamLimit) {
  const teamGroups = [];
  let groups = [];
  let triggerIdx = 0;

  teams.forEach((team) => {
    const checkGroupsLimit = () => {
      if (groups.length === teamLimit) {
        teamGroups.push(groups);
        groups = [];
      }

      groups.push(team);
    };

    const checkRemainderGroups = () => {
      triggerIdx += 1;

      if (teams.length === triggerIdx) {
        if (groups.length) teamGroups.push(groups);
      }
    };

    checkGroupsLimit();
    checkRemainderGroups();
  });

  return teamGroups;
}

/**
 *
 * @param {Array} teams
 */
function splitTeam(teams) {
  const splitTeams = teams;

  if (splitTeams.length === 1) {
    return console.log("팀을 나누기에는 멤버가 1팀 밖에 없어요!");
  }

  splitTeams.forEach((item, idx) => {
    const insertAfterSplit = (popIdx, insertIdx) => {
      const lastValue = splitTeams[popIdx].pop();
      splitTeams[insertIdx].push(lastValue);
      splitTeam(splitTeams);
    };

    if (idx === 0) {
      if (item.length - splitTeams[idx + 1].length > 1) {
        insertAfterSplit(idx, idx + 1);
      }
    } else if (splitTeams[idx + 1] && splitTeams[idx + 1].length) {
      if (item.length - splitTeams[idx + 1].length > 1) {
        insertAfterSplit(idx, idx + 1);
      }
    } else if (
      splitTeams[0].length - splitTeams[splitTeams.length - 1].length >
      1
    ) {
      insertAfterSplit(0, splitTeams.length - 1);
    }
  });

  return splitTeams.sort(
    (firstTeams, secondTeams) => secondTeams.length - firstTeams.length
  );
}

const teams = makeTeam(
  shuffle([
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
  ]),
  1
);

const resultTeam = splitTeam(teams);
console.log("resultTeam =>>", resultTeam);
