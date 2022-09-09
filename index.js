const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

const global = {
  members: [],
  teamLimit: 0,
  splitChannelId: 0,
  splitTeamUI: function () {
    const CONTENT = "게임할 인원들이에요!";
    const buttonRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("delete")
          .setLabel("-")
          .setStyle(ButtonStyle.Danger)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("add")
          .setLabel("+")
          .setStyle(ButtonStyle.Success)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("start")
          .setLabel("시작!")
          .setStyle(ButtonStyle.Primary)
      );

    const attendMemberEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("게임할 전사 리스트")
      .setDescription(
        this.members.join("\n") + `\n \n 팀당 최대 참여자 수: ${this.teamLimit}`
      );

    return {
      content: CONTENT,
      row: [buttonRow],
      embed: [attendMemberEmbed],
    };
  },
};

client.on("ready", () => {
  client.application.commands
    .set([
      {
        name: "팀나누기",
        description: "팀을 나눕니다.",
      },
      {
        name: "팀채널정하기",
        description: "팀을 나누기 위해서 팀 분배 보이스 채널을 설정해야되요!",
      },
      {
        name: "정보",
        description: "봇 정보를 확인합니다.",
      },
    ])
    .catch(console.error);

  console.log("팀나누기 봇이 실행되었습니다.");
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.commandName === "팀채널정하기") {
    const teammChannelSettingModal = new ModalBuilder()
      .setCustomId("team-channel-setting")
      .setTitle("팀채널 설정");

    const teamChannelSettingInput = new TextInputBuilder()
      .setCustomId("team-channel-setting-input")
      .setLabel("팀을 분배할 보이스 채널을 입력해주세요.")
      .setStyle(TextInputStyle.Short);

    teammChannelSettingModal.addComponents(
      new ActionRowBuilder().addComponents(teamChannelSettingInput)
    );

    await interaction.showModal(teammChannelSettingModal);
  }

  if (interaction.commandName === "팀나누기") {
    if (global.splitChannelId === 0) {
      return await interaction.reply({
        content: '"/팀채널정하기 명령어"를 통해서 팀채널을 먼저 설정해주세요',
      });
    }

    const channel = client.guilds.cache.get("895935056504307754");
    global.members = channel.members.cache
      .filter((member) => member.voice.channelId === global.splitChannelId)
      .map((item) => {
        return item.nickname || item.user.username;
      });

    if (!global.members.length) {
      return await interaction.reply({
        content: `${global.splitChannelId} 채널에 사람이 없네요 ㅠㅠ`,
      });
    }

    const { embed, row, content } = global.splitTeamUI();

    return await interaction.reply({
      content,
      components: row,
      embeds: embed,
    });
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === "team-channel-setting") {
      global.splitChannelId = interaction.fields.getTextInputValue(
        "team-channel-setting-input"
      );

      return await interaction.reply({
        content: `팀 분배 보이스 채널: ${global.splitChannelId}`,
      });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "delete") {
      if (Math.sign(global.teamLimit) === -1) global.teamLimit = 0;
      global.teamLimit -= 1;
      const { embed, row, content } = global.splitTeamUI();

      await interaction.update({
        content,
        components: row,
        embeds: embed,
      });
    } else if (interaction.customId === "add") {
      global.teamLimit += 1;
      const { embed, row, content } = global.splitTeamUI();

      return await interaction.update({
        content,
        components: row,
        embeds: embed,
      });
    } else if (interaction.customId === "start") {
    }
  }
});

client.login(process.env.SPLIT_TEAM_TOKEN);
