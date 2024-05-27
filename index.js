const { Client, GatewayIntentBits } = require("discord.js");
global.EmbedBuilder = require("discord.js").EmbedBuilder;
global.ActionRowBuilder = require("discord.js").ActionRowBuilder;
global.ButtonBuilder = require("discord.js").ButtonBuilder;
global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
  fetchAllMembers: true,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
});
global.colors = require("colors");
global.config = require("./config.js");
global.db = require("croxydb");
global.moment = require("moment");
global.express = require("express");
global.app = express();
global.mongoose = require("mongoose");
global.sendLog = require("./functions/sendLog.js");
global.autoCSC = require("./functions/autoCSC.js");
global.loadUsers = require("./functions/loadUsers.js");

require("./functions/mongoose.js")(this);
require("./functions/load.js")(this);
require("./functions/express.js")(this);

client.on("ready", () => {
  console.log(
    `${colors.cyan("[BOT]")} --> ${colors.green(
      "Bot Başarıyla Aktif Edildi!",
    )} Botun Adı: ${colors.green(
      client.user.username,
    )} | Botun ID'si: ${colors.green(client.user.id)}`.green,
  );
  client.user.setPresence({
    activities: [
      {
        name: "FastSecurity ❤️ FastUptime",
        type: 0,
      },
    ],
    status: "idle",
  });
});

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  let guild = db.get("guild");
  if (!guild) return;
  if (member.guild.id !== guild) return;
  let unverified = db.get("unverified");
  try {
    member.roles.add(unverified);
  } catch (error) {
    console.log(error);
  }
  console.log(
    `${colors.bgCyan("[BOT]").black} --> ${colors.green(
      "Sunucuya Yeni Bir Üye Katıldı!",
    )} Üyenin Adı: ${colors.green(
      member.user.username,
    )} | Üyenin ID'si: ${colors.green(member.user.id)}`.green,
  );
});

client
  .login(config.bot.token)
  .catch(() =>
    console.log(
      `${colors.bgRed("[HATA]").black} --> ${colors.red(
        "Botun Tokeni Geçersiz! Lütfen Tokeni Kontrol Ediniz!",
      )}`.red,
    ),
  );
