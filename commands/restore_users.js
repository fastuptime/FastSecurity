module.exports = {
  adminOnly: true,
  name: "restore_users",
  usage: "/restore_users <do_approve>",
  options: [
    {
      name: "do_approve", // onayla
      description: "Kullanıcılar bu sunucuya eklenecektir. Onaylıyor musunuz?",
      type: 5,
      required: true,
    },
  ],
  category: "Bot",
  description: "Kullanıcıları geri yükler. Bu işlem uzun sürmektedir.",
  run: async (client, interaction) => {
    let do_approve = interaction.options.getBoolean("do_approve");
    if (!do_approve)
      return interaction.reply({
        content: "Onaylamadığınız için işlem iptal edildi.",
        ephemeral: true,
      });

    const dbUsers = await discordModel.countDocuments();
    if (dbUsers < 1)
      return interaction.reply({
        content: "Veritabanında hiç kullanıcı bulunamadı.",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("Kullanıcılar Geri Yükleniyor...")
      .setDescription(
        `Veritabanında bulunan **${dbUsers}** adet kullanıcı sunucuya geri yükleniyor. Bu işlem ortalama ${Math.ceil(
          dbUsers / 60,
        )} dakika sürecektir. İşlemi terminal ekranından takip edebilirsiniz.`,
      )
      .setColor(0x2f3136)
      .setTimestamp();

    interaction.reply({ embeds: [embed], ephemeral: true });

    loadUsers(interaction.guild.id);
  },
};
