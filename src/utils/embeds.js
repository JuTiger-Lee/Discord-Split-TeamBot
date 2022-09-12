const {
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const status = require("../utils/status");

function teamSetting() {
  const CONTENT = "팀원 리스트에요!";
  const buttonRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(status.events.button.DELETE)
        .setLabel("-")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(status.events.button.ADD)
        .setLabel("+")
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(status.events.button.START)
        .setLabel("시작!")
        .setStyle(ButtonStyle.Primary)
    );

  const attendMember = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("팀원 리스트")
    .setDescription(
      `${status.members.join("\n")} \n \n` +
        `팀당 최대 참여자 수: ${status.teamLimit}`
    );

  return {
    content: CONTENT,
    row: buttonRow,
    embed: attendMember,
  };
}

function resultSplitTeam(resultSplitTemplate) {
  const resultAttendMember = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("팀 분배 결과 리스트")
    .setDescription(resultSplitTemplate);

  return {
    content: "팀 결과에요!",
    embed: resultAttendMember,
  };
}

module.exports = {
  teamSetting,
  resultSplitTeam,
};
