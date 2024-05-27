module.exports = {
  adminOnly: true,
  name: "settings",
  usage: "/settings <unverified> <verified> <welcome> <log> <do_approve>",
  options: [
    {
      name: "unverified", // onaylanmamış rolü
      description: "Giriş yapınca verilecek rol",
      type: 8, // 8 => rol, 7 => kanal, 3 => string, 4 => integer, 5 => boolean
      required: true,
    },
    {
      name: "verified", // onaylanmış rolü
      description: "Onaylanınca verilecek rol",
      type: 8,
      required: true,
    },
    {
      name: "welcome", // hoşgeldin kanalı
      description: "Hoşgeldin kanalı",
      type: 7,
      channel_types: [0],
      required: true,
    },
    {
      name: "log", // log kanalı
      description: "Log kanalı",
      type: 7,
      channel_types: [0],
      required: true,
    },
    {
      name: "do_approve", // onayla
      description:
        "Kanallar üzerinde değişiklik yapılacaktır. Onaylıyor musunuz?",
      type: 5,
      required: true,
    },
  ],
  category: "Bot",
  description: "Bot ayarları",
  run: async (client, interaction) => {
    let unverified = interaction.options.getRole("unverified");
    let verified = interaction.options.getRole("verified");
    let welcome = interaction.options.getChannel("welcome");
    let log = interaction.options.getChannel("log");
    let do_approve = interaction.options.getBoolean("do_approve");
    if (!do_approve)
      return interaction.reply({
        content:
          "Onaylamadığınız için işlem iptal edildi.\nKanallar üzerinde mecburi değişiklik yapılacağı için onaylamanız gerekmektedir.",
        ephemeral: true,
      });

    if (!unverified || !verified || !welcome || !log)
      return interaction.reply({ content: "Lütfen tüm argümanları giriniz." });

    db.set("unverified", unverified.id);
    db.set("verified", verified.id);
    db.set("welcome", welcome.id);
    db.set("log", log.id);
    db.set("guild", interaction.guild.id);

    const embed = new EmbedBuilder()
      .setTitle("FastSecurity | Ayarlar")
      .setDescription(
        `Onaylanmamış rol: <@&${unverified.id}> \nOnaylanmış rol: <@&${verified.id}> \nHoşgeldin kanalı: <#${welcome.id}> \nLog kanalı: <#${log.id}>`,
      )
      .setColor(0x00ff00)
      .setTimestamp();

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });

    sendLog({
      embed: true,
      title: "FastSecurity | Ayarlar",
      description: `Onaylanmamış rol: <@&${unverified.id}> \nOnaylanmış rol: <@&${verified.id}> \nHoşgeldin kanalı: <#${welcome.id}> \nLog kanalı: <#${log.id}>`,
      color: 0x00ff00,
      timestamp: true,
    });

    autoCSC();

    const embedWelcome = new EmbedBuilder()
      .setDescription(
        `**Sunucuya hoşgeldiniz!** \nLütfen hesabınızı onaylamak için alttaki butona tıklayınız.`,
      )
      .setColor(0x00ff00)
      .setTimestamp();

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(5)
        .setLabel("Onayla")
        .setURL(`${config.siteURL}/verify`),
    );

    welcome.send({
      embeds: [embedWelcome],
      components: [button],
    });

    console.log(
      colors.bgGreen("[+]") + colors.green(" Ayarlar başarıyla güncellendi."),
    );
  },
};
