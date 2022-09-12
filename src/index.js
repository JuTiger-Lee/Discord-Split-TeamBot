const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

(function () {
  app.bootstrap().login(process.env.SPLIT_TEAM_TOKEN);
  http
    .createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Discord Split Team Bot Server");
    })
    .listen(process.env.PORT);
})();
