const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const status = require("../utils/status");
const embeds = require("../utils/embeds");

module.exports = async (client, interaction) => {
  if (interaction.commandName === status.events.command.INFORMATION) {
    const { content, embed } = embeds.botInformation();

    return await interaction.reply({ content, embeds: [embed] });
  }

  if (interaction.commandName === status.events.command.TEAM_CAHNNEL_CHOICE) {
    const teammChannelSettingModal = new ModalBuilder()
      .setCustomId("team-channel-setting")
      .setTitle("Team Channel Settings");

    const teamChannelSettingInput = new TextInputBuilder()
      .setCustomId("team-channel-setting-input")
      .setLabel("Enter the Team Distribution Voice Channel ID.")
      .setStyle(TextInputStyle.Short);

    teammChannelSettingModal.addComponents(
      new ActionRowBuilder().addComponents(teamChannelSettingInput)
    );

    return await interaction.showModal(teammChannelSettingModal);
  }

  if (interaction.commandName === status.events.command.TEAM_SPLIT) {
    const serverId = interaction.guild.id;
    const channel = client.guilds.resolve(serverId);

    if (!status.splitChannelId) {
      return await interaction.reply({
        content:
          'Please set up the team voice channel first using the command "/split_channel_setting"',
      });
    }

    const members = await channel.members.fetch();

    status.members = members
      .filter((member) => member.voice.channelId === status.splitChannelId)
      .map((voiceMember) => voiceMember.nickname || voiceMember.user.username);

    const { embed, row, content } = embeds.teamSetting();

    if (!status.members.length) {
      return await interaction.reply({
        content: `There's no one on the ${status.splitChannelId} channel`,
      });
    }

    if (status.members.length === 1) {
      return await interaction.reply({
        content: `There is only one person on the ${status.splitChannelId} channel.`,
      });
    }

    return await interaction.reply({
      content,
      components: [row],
      embeds: [embed],
    });
  }
};
