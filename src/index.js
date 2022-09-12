const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

(function () {
  app.bootstrap().login(process.env.SPLIT_TEAM_TOKEN);
})();
