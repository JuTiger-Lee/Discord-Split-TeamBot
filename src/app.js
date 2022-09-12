const { Client, GatewayIntentBits } = require("discord.js");
const interaction = require("./interaction/index");
const status = require("./utils/status");

function bootstrap() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  client.on("ready", () => {
    client.application.commands
      .set([
        {
          name: status.events.command.TEAM_SPLIT,
          description: "팀을 나눕니다.",
        },
        {
          name: status.events.command.TEAM_CAHNNEL_CHOICE,
          description: "팀을 나누기 위해서 팀 분배 보이스 채널을 설정해야되요!",
        },
        {
          name: status.events.command.INFORMATION,
          description: "봇 정보를 확인합니다.",
        },
      ])
      .catch(console.error);

    console.log("팀나누기 봇이 실행되었습니다.");
  });

  interaction(client);

  return client;
}

module.exports = {
  bootstrap,
};
