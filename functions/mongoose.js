module.exports = async () => {
  mongoose.connect(config.mongoURL);

  mongoose.connection.on("connected", () => {
    console.log(
      colors.bgGreen("[+]") + colors.green(" MongoDB bağlantısı başarılı."),
    );
  });

  mongoose.connection.on("err", () => {
    console.log(
      colors.bgRed("[!]") + colors.red(" MongoDB bağlantısı başarısız."),
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.log(
      colors.bgRed("[!]") + colors.red(" MongoDB bağlantısı kesildi."),
    );
  });

  global.discordModel = require("../models/user.js");
};
