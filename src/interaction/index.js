const command = require("./command");
const event = require("./event");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    await command(client, interaction);
    await event(client, interaction);
  });
};
