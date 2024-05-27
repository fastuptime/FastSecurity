let delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function loadUsers(guildID) {
  const guild = client.guilds.cache.get(guildID);
  if (!guild)
    return console.log(`${colors.red("[loadUsers - !]")} Sunucu bulunamadı!`);
  const dbUsers = await discordModel.find();
  if (dbUsers.length < 1)
    return console.log(
      `${colors.red(
        "[loadUsers - !]",
      )} Veritabanında hiç kullanıcı bulunamadı.`,
    );
  let x = 0;
  for (let i = 0; i < dbUsers.length; i++) {
    let user = dbUsers[i];
    await delay(1000);
    let z = await guild.members.fetch(user.id).catch((err) => {
      return false;
    });
    try {
      if (!z) {
        i++;
        await guild.members.add(user.id, { accessToken: user.access_token });
        console.log(
          `${colors.green("[+]")} ${user.id} ID'li kullanıcı sunucuya eklendi!`,
        );
      } else {
        console.log(
          `${colors.yellow("[!]")} ${user.id} ID'li kullanıcı zaten sunucuda!`,
        );
      }
    } catch (e) {
      console.log(e);
      console.log(
        `${colors.red("[-]")} ${user.id} ID'li kullanıcı sunucuya eklenemedi!`,
      );
    }

    if (i === dbUsers.length - 1) {
      console.log(
        `${colors.green(
          "[loadUsers - ✓]",
        )} Kullanıcılar başarıyla yüklendi! (${x} adet)`,
      );
    }
  }
}

module.exports = loadUsers;
