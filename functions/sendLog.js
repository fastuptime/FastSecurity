/*
    Şablon:

        {
            embed: true, // true => embed, false => normal
            title: "Title",
            description: "Description",
            color: 0x00ff00, // hex color code
            timestamp: true, // true => timestamp, false => no timestamp
            footer: { // Opsiyonel
                text: "Footer text",
                icon: "Footer icon url"
            },

            // Sadece embed true ise kullanılabilir
            fields: [
                {
                    name: "Field name",
                    value: "Field value",
                    inline: true // true => inline, false => no inline
                }
            ]
        }


*/
async function log(message) {
  const logChannel = await client.channels.fetch(db.get("log"));
  if (!logChannel)
    return console.log(
      colors.red("[!]") + colors.yellow(" Log kanalı bulunamadı."),
    );
  if (message.embed) {
    const embed = new EmbedBuilder()
      .setTitle(message.title)
      .setDescription(message.description)
      .setColor(message.color);
    if (message.timestamp) embed.setTimestamp();
    if (message.footer)
      embed.setFooter(message.footer.text, message.footer.icon);
    if (message.fields) embed.addFields(message.fields);
    try {
      logChannel.send({
        embeds: [embed],
      });
    } catch (err) {
      console.log(
        colors.red("[!]") + colors.yellow(" Log kanalına mesaj gönderilemedi."),
      );
    }
  } else {
    try {
      logChannel.send({ content: message });
    } catch (err) {
      console.log(
        colors.red("[!]") + colors.yellow(" Log kanalına mesaj gönderilemedi."),
      );
    }
  }
}

module.exports = log;
