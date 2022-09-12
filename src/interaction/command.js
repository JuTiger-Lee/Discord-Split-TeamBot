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
  }

  if (interaction.commandName === status.events.command.TEAM_CAHNNEL_CHOICE) {
    const teammChannelSettingModal = new ModalBuilder()
      .setCustomId("team-channel-setting")
      .setTitle("팀채널 설정");

    const teamChannelSettingInput = new TextInputBuilder()
      .setCustomId("team-channel-setting-input")
      .setLabel("팀을 분배할 보이스 채널 ID를 입력해주세요.")
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
        content: '"/팀채널정하기" 명령어를 통해서 팀채널을 먼저 설정해주세요',
      });
    }

    const members = await channel.members.fetch();

    status.members = members
      .filter((member) => member.voice.channelId === status.splitChannelId)
      .map((voiceMember) => voiceMember.nickname || voiceMember.user.username);

    const { embed, row, content } = embeds.teamSetting();

    if (!status.members.length) {
      return await interaction.reply({
        content: `${status.splitChannelId} 채널에 사람이 없네요 ㅠㅠ`,
      });
    }

    if (status.members.length === 1) {
      return await interaction.reply({
        content: `${status.splitChannelId} 채널에 1명밖에 없어요!`,
      });
    }

    return await interaction.reply({
      content,
      components: [row],
      embeds: [embed],
    });
  }
};
