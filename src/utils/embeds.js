const {
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const status = require("../utils/status");

function teamSetting() {
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
        .setLabel("Start")
        .setStyle(ButtonStyle.Primary)
    );

  const attendMember = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Team member list")
    .setDescription(
      `${status.members.join("\n")} \n \n` +
        `Maximum number of participants per team: ${status.teamLimit}`
    );

  return {
    content: "Team member list",
    row: buttonRow,
    embed: attendMember,
  };
}

function resultSplitTeam(resultSplitTemplate) {
  const resultAttendMember = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Team Distribution Results List")
    .addFields(resultSplitTemplate);

  return {
    content: "Team Distribution Results List",
    embed: resultAttendMember,
  };
}

function botInformation() {
  const botInfo = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("SplitTeam Bot Information")
    .addFields([
      { name: "Name", value: "SplitTeam" },
      { name: "Version", value: "1.0.0" },
      { name: "Developer", value: "Jutiger-Lee" },
      {
        name: "Repository",
        value:
          "[SplitTeam-Github](https://github.com/JuTiger-Lee/Discord-Split-TeamBot)",
      },
    ]);

  return {
    content: "Bot Information",
    embed: botInfo,
  };
}

module.exports = {
  teamSetting,
  resultSplitTeam,
  botInformation,
};
