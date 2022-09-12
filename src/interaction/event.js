const status = require("../utils/status");
const embeds = require("../utils/embeds");

module.exports = async (client, interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId === "team-channel-setting") {
      status.splitChannelId = interaction.fields.getTextInputValue(
        "team-channel-setting-input"
      );

      return await interaction.reply({
        content: `팀 분배 보이스 채널 ID: ${status.splitChannelId}`,
      });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === status.events.button.DELETE) {
      if (status.teamLimit !== 1) status.teamLimit -= 1;

      const { embed, row, content } = embeds.teamSetting();

      await interaction.update({
        content,
        components: [row],
        embeds: [embed],
      });
    } else if (interaction.customId === status.events.button.ADD) {
      status.teamLimit += 1;
      const { embed, row, content } = embeds.teamSetting();

      return await interaction.update({
        content,
        components: [row],
        embeds: [embed],
      });
    } else if (interaction.customId === status.events.button.START) {
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
      async function splitTeam(teams) {
        const splitTeams = teams;

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

      const teams = makeTeam(shuffle(status.members), status.teamLimit);

      if (teams.length === 1) {
        return await interaction.reply({
          content: "팀을 나누기에는 팀이 1팀 밖에 없어요!",
        });
      }

      const splitTeams = await splitTeam(teams);
      let resultSplitTemplate = "";

      splitTeams.forEach(
        (temas, idx) =>
          (resultSplitTemplate += `${idx + 1}팀\n${temas.join("\n")} \n\n`)
      );

      const { content, embed } = embeds.resultSplitTeam(resultSplitTemplate);

      return await interaction.reply({
        content,
        embeds: [embed],
      });
    }
  }
};
