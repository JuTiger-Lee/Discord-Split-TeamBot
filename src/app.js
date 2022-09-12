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
          description: "Divide the team.",
        },
        {
          name: status.events.command.TEAM_CAHNNEL_CHOICE,
          description:
            "To divide the team, you need to set up a voice channel.",
        },
        {
          name: status.events.command.INFORMATION,
          description: "Check bot information.",
        },
      ])
      .catch(console.error);

    console.log("SplitTeam Bot Server Start");
  });

  interaction(client);

  return client;
}

module.exports = {
  bootstrap,
};
