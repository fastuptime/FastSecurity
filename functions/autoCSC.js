// Auto Channel Settings Change - AutoCSC - Otomatik Kanal Ayarları Değiştirme
async function autoCSC() {
  let guild = client.guilds.cache.get(db.get("guild"));
  if (!guild)
    return console.log(colors.bgRed("[!]") + colors.red(" Sunucu bulunamadı."));
  let channels = guild.channels.cache;
  let unverified = guild.roles.cache.get(db.get("unverified"));
  if (!unverified)
    return console.log(
      colors.bgRed("[!]") + colors.red(" Unverified rolü bulunamadı."),
    );
  try {
    channels.forEach(async (channel) => {
      await channel.permissionOverwrites.edit(unverified, {
        ViewChannel: false,
      });
      if (channel.id == db.get("welcome")) {
        await channel.permissionOverwrites.edit(unverified, {
          ViewChannel: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = autoCSC;
