const status = require("../utils/status");
const embeds = require("../utils/embeds");

module.exports = async (client, interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId === status.events.modal.TEAM_CHANNEL_SETTING) {
      status.splitChannelId = interaction.fields.getTextInputValue(
        "team-channel-setting-input"
      );

      return await interaction.reply({
        content: `Team voice channel ID: ${status.splitChannelId}`,
      });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === status.events.button.DELETE) {
      if (status.teamLimit !== 1) status.teamLimit -= 1;

      const { embed, row, content } = embeds.teamSetting();

      return await interaction.update({
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
      const shuffle = (array) => {
        const shuffleArr = array;

        return shuffleArr.sort(() => Math.random() - 0.5);
      };

      /**
       *
       * @param {Array} teams
       * @param {Number} teamLimit
       */
      const makeTeam = (teams, teamLimit) => {
        const teamGroups = [];
        let groups = [];

        teams.forEach((team, idx) => {
          const checkGroupsLimit = () => {
            if (groups.length === teamLimit) {
              teamGroups.push(groups);
              groups = [];
            }

            groups.push(team);
          };

          const checkRemainderGroups = () => {
            if (teams.length === idx + 1) {
              if (groups.length) teamGroups.push(groups);
            }
          };

          checkGroupsLimit();
          checkRemainderGroups();
        });

        return teamGroups;
      };

      /**
       *
       * @param {Array} teams
       */
      const splitTeam = async (teams) => {
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
      };

      const groups = makeTeam(shuffle(status.members), status.teamLimit);

      if (groups.length === 1) {
        return await interaction.reply({
          content: "There is only one team.",
        });
      }

      const splitTeams = await splitTeam(groups);

      const resultSplitTemplate = splitTeams.map((teams, idx) => {
        return {
          name: `${idx + 1} Team`,
          value: teams.join("\n"),
        };
      });

      const { content, embed } = embeds.resultSplitTeam(resultSplitTemplate);

      return await interaction.reply({
        content,
        embeds: [embed],
      });
    }
  }
};
