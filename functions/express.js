const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const MemoryStore = require("memorystore")(session);
const ejs = require("ejs");
const bodyParser = require("body-parser");
const qs = require("querystring");
const axios = require("axios");

module.exports = function () {
  app.set("view engine", "ejs");
  app.set("views", `${process.cwd()}/views`);
  app.use("/assets", express.static(`views/assets`));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.use(
    session({
      secret: `FastUptimeVerySecretKey`,
      resave: false,
      saveUninitialized: false,
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new DiscordStrategy(
      {
        clientID: config.bot.clientID,
        clientSecret: config.bot.clientSecret,
        callbackURL: `${config.siteURL}/callback`,
        scope: [`identify`, `guilds.join`, `email`],
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          if (await discordModel.findOne({ id: profile.id })) {
            await discordModel.findOneAndUpdate(
              { id: profile.id },
              {
                access_token: accessToken,
                refresh_token: refreshToken,
                email: profile.email,
              },
            );
          } else {
            await new discordModel({
              id: profile.id,
              access_token: accessToken,
              refresh_token: refreshToken,
              email: profile.email,
            }).save();
          }
        } catch (e) {
          console.log(e);
        }
        cb(null, profile);
      },
    ),
  );

  global.checkAuthDc = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/discord");
  };

  app.get("/auth/discord", passport.authenticate("discord"));
  app.get(
    "/callback",
    passport.authenticate("discord", {
      failureRedirect: "/",
    }),
    function (req, res) {
      res.redirect("/verify");
    },
  );

  app.get("/verify", checkAuthDc, async (req, res) => {
    res.render("verify.ejs", {
      user: req.user,
      siteKey: config.reCaptcha.siteKey,
    });
  });

  app.post("/captcha", checkAuthDc, async (req, res) => {
    let token = req.body["g-recaptcha-response"];
    if (!token)
      return res.json({ status: false, message: "Doğrulama Başarısız" });

    let data = qs.stringify({
      secret: config.reCaptcha.secretKey,
      response: token,
    });

    let conf = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.google.com/recaptcha/api/siteverify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let x = await axios(conf);
    if (x.data.success) {
      const guild = client.guilds.cache.get(db.get("guild"));
      if (!guild)
        return res.redirect(
          "/verify?status=false&message=Sunucuyu bulamadım. Yöneticiler ile iletişime geçin.",
        );
      const member = await guild.members.fetch(req.user.id);
      if (!member)
        return res.redirect(
          "/verify?status=false&message=Sizi sunucuda bulamadım.",
        );
      member.roles.remove(db.get("unverified"));
      member.roles.add(db.get("verified"));

      sendLog({
        embed: true,
        title: "FastSecurity | Captcha Başarılı",
        description: `**${req.user.username}**(\`${req.user.id}\`) adlı kullanıcı captcha doğrulamasını geçti.`,
        color: 0x00ff00,
        timestamp: true,
      });

      res.redirect(
        "/verify?status=true&message=Artık sunucuya erişebilirsiniz.",
      );
    } else {
      sendLog({
        embed: true,
        title: "FastSecurity | Captcha Başarısız",
        description: `**${req.user.username}**(\`${req.user.id}\`) adlı kullanıcı captcha doğrulamasını geçemedi.`,
        color: 0xff0000,
        timestamp: true,
      });
      res.redirect("/verify?status=false&message=Lütfen tekrar deneyin.");
    }
  });

  app.use((req, res) => {
    res.redirect("/verify");
  });

  app.listen(config.port, () => {
    console.log(
      colors.cyan("[+]") +
        colors.yellow(` ${config.siteURL}`) +
        colors.cyan(" adresi üzerinden siteye erişebilirsiniz."),
    );
  });
};
