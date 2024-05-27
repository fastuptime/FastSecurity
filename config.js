module.exports = {
  adminID: ["adminID", "Admin 2"], // admin id
  mongoURL: "mongoURL", // https://www.mongodb.com/cloud/atlas
  siteURL: "https://domain.com", // https://domain.com
  port: 80, // 80
  reCaptcha: {
    // https://www.google.com/recaptcha/admin/create
    siteKey: "xxxxxxxxxxxxxxxxxxxxxxxx", // site key
    secretKey: "xxxxxx-xxxx-xxxx-xxx", // secret key
  },
  bot: {
    // https://discord.com/developers/applications
    token: "token",
    clientSecret: "clientSecret",
    clientID: "clientID",
    // redictURL: "https://domain.com/callback",
  },
};
