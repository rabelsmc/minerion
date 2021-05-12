const Discord = require("discord.js");
const data = require("quick.db");
const ayarlar = require("../ayarlar.json");


exports.run = async (client, message, args) => {
  const prefix =
    (await data.fetch(`prefix.${message.guild.id}`)) || ayarlar.prefix;
  const ad = await data.fetch(`numara.${message.channel.id}`);
  if (!ad) {    ad = "0";
  }
//
  if (
    message.channel.name === `destek-${ad}` ||
    message.channel.name === `kapatıldı-${ad}`
  ) {
    const ann = await data.fetch(
      `asd.${message.guild.id}.${message.channel.id}.${message.author.id}`
    );
    if (!ann) return message.channel.send(`Bu bilet senin değil.`);
    message.delete();

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#ff4400")
        .setDescription(`Bilet ${message.author} tarafından kapatıldı.`)
    );
    message.channel.setName(`kapatıldı-${ad}`);
    message.channel
      .send(
        new Discord.MessageEmbed().setColor("#ff4400")
          .setDescription(`:unlock:: Ticketi tekrar açar.

:no_entry:: Ticketi siler.`)
      )
      .then(m => {
        m.react("🔓");
        m.react("⛔");
        let sil = (reaction, user) =>
          reaction.emoji.name === "⛔" &&
          user.id !== client.user.id &&
          user.id == message.author.id;
        let sill = m.createReactionCollector(sil, { time: 0 });
        let geri = (reaction, user) =>
          reaction.emoji.name === "🔓" &&
          user.id !== client.user.id &&
          user.id == message.author.id;
        let geriaç = m.createReactionCollector(geri, { time: 0 });

        geriaç.on("collect", async reaction => {
          const author = reaction.users.last();
          m.delete("500");
          reaction.remove(author.id);
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#ff4400")
              .setDescription(
                `Bilet ${message.author} tarafından tekrar açıldı.`
              )
          );
          message.channel.setName(`ticket-${ad}`);
        });

        sill.on("collect", async reaction => {
          const author = reaction.users.last();
          reaction.remove(author.id);
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#ff4400")
              .setDescription(`Bilet 5 saniye sonra ebediyen silinecek.`)
          );
          setTimeout(async () => {
            message.channel.delete();
            data.delete(`asd.${message.guild.id}.${message.channel.id}`);
          }, 5000);
        });
      });
  } else {
    return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bilet-kapat"],
  permLevel: 0
};

exports.help = {
  name: "kapat"
};
