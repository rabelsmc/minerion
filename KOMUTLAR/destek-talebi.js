const Discord = require("discord.js");
const data = require("quick.db");
const ayarlar = require("../ayarlar.json");


exports.run = async (client, message, args) => {
  const prefix =
    (await data.fetch(`prefix.${message.guild.id}`)) || ayarlar.prefix;

  if (args[0] === "gönder") {
    const kanalbelirle = await data.fetch(`kanal.${message.guild.id}`);
    if (!kanalbelirle)
      return message.channel.send(
        `Mesajı göndereceğim kanalı ayarlamamışsın: ${prefix}ticket-kanal ayarla #kanal`
      );
    client.channels
      .cache.get(kanalbelirle)
      .send(
        new Discord.MessageEmbed()
          .setColor("#f54a1a")
          .setDescription(`<:melodias:835703432894873681> - Talep oluştur!

Talep oluşturmak için <:sipari:835842631892336640> tepkisine tıklayabilirsin buradan bize soruda sorabilirsin, unutmayın elimizden geldiğince her türlü desteği sizlere veriyoruz.

<:mesajat:828207455792136192> Melodia ekbini boş yere rahatsız etmek, gereksiz talep açmak, taleplere yanıt vermemek ceza almanıza sebep olabilir.`)
      )
      .then(m => {
        m.react("<:sipari:835842631892336640>");
        let açç = (reaction, user) =>
          reaction.emoji.name === "sipari" && user.id !== client.user.id;
        let aç = m.createReactionCollector(açç, { time: 0 });

        aç.on("collect", async reaction => {
          const author = reaction.users.cache.last();
          reaction.users.remove(author.id);
          const sd = await data.fetch(`ass.${message.guild.id}.${author.id}`);

          data.add(`numara.${message.guild.id}`, 1);
          const as = await data.fetch(`numara.${message.guild.id}`);
          message.guild.channels.create(`talep-${as}`).then(async s => {
            data.add(`numara.${s.id}`, as);
            data.set(`ass.${message.guild.id}.${author.id}`, s.id);
            data.set(
              `asd.${message.guild.id}.${s.id}.${author.id}`,
              "ticketaçma"
            );
            let role = message.guild.roles.cache.find(r => r.name === "@everyone");
            s.createOverwrite(role, { VIEW_CHANNEL: false });
            message.guild.members.cache.forEach(u => {
              if (u.hasPermission("VIEW_AUDIT_LOG")) {
                s.createOverwrite(u, {
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: true,
                  MANAGE_MESSAGES: true,
                  MANAGE_CHANNELS: true
                });
              }
            });
            s.createOverwrite(author, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            });
            s.send(
              `<@&835680134869680179> `,
              new Discord.MessageEmbed()
                .setColor("#e63434")
                .setDescription(
                  `Selam, \nTalebini başarıyla aldık. Şimdi ise yetkili ekibini beklemelisin bu sırada ne için talep açtığını buraya yazabilirsin unutma gereksiz açılan taleplerden ceza alırsın.`)
                .setFooter(
                  `Melodia`,
                  client.user.avatarURL
                )
            ).then(m => {
              m.react(`<:evet:829510477863321620>`);
              let si = (reaction, user) =>
                reaction.emoji.name === "evet" && user.id !== client.user.id;
              let s23 = m.createReactionCollector(si, { time: 0 });

              s23.on("collect", async reaction => {
                const author = reaction.users.cache.last();
                reaction.users.remove(author.id);
                m.react(`<:evet:829510477863321620>`);
                m.react(`<:hayir:829510626862825472>`);
                let sil = (reaction, user) =>
                  reaction.emoji.name === "evet" && user.id !== client.user.id;
                let sill = m.createReactionCollector(sil, { time: 0 });
                let ss = (reaction, user) =>
                  reaction.emoji.name === "hayir" && user.id !== client.user.id;
                let s2 = m.createReactionCollector(ss, { time: 0 });
                s2.on("collect", async reaction => {
                  s.messages.fetch({ limit: 10 }).then(async messages => {
                    messages
                      .get(m.id)
                      .reactions.cache.get("<:evet:829510477863321620>")
                      .removeAll();
                    reaction.users.removeAll();
                  });
                });
                sill.on("collect", async reaction => {
                  let us = reaction.users.cache.last();
                  reaction.users.remove(us.id);
                  s.send(
                    new Discord.MessageEmbed()
                      .setColor("#ff4400")
                      .setDescription(`Talep ${us} tarafından kapatıldı tekrar açmak için :unlock: emojisne tıklayabilirsiniz.`)
                  );
                  s.setName(`kapatıldı-${as}`);
                  s.send(
                    new Discord.MessageEmbed().setColor("#ff4400")
                      .setDescription(`:unlock: Ticketi tekrar açar.

:no_entry:: Ticketi siler.`)
                  ).then(m2 => {
                    m2.react("🔓");
                    m2.react("⛔");
                    let sil = (reaction, user) =>
                      reaction.emoji.name === "⛔" &&
                      user.id !== client.user.id;
                    let sill = m2.createReactionCollector(sil, { time: 0 });
                    let geri = (reaction, user) =>
                      reaction.emoji.name === "🔓" &&
                      user.id !== client.user.id;
                    let geriaç = m2.createReactionCollector(geri, { time: 0 });

                    geriaç.on("collect", async reaction => {
                      const author = reaction.users.cache.last();
                      m2.delete({ timeout: 5000   });
                      reaction.users.remove(author.id);
                      s.send(
                        new Discord.MessageEmbed()
                          .setColor("#ff4400")
                          .setDescription(
                            `Bilet ${author} tarafından tekrar açıldı.`
                          )
                      );
                      s.setName(`talep-${as}`);
                    });

                    sill.on("collect", async reaction => {
                      const author = reaction.users.cache.last();
                      reaction.users.remove(author.id);
                      s.send(
                        new Discord.MessageEmbed()
                          .setColor("#ff4400")
                          .setDescription(
                            `Bilet 5 saniye sonra tamamen silinecek.`
                          )
                      );
                      setTimeout(async () => {
                        s.delete();
                        const sd = await data.fetch(
                          `ass.${message.guild.id}.${author.id}`
                        );
                        data.delete(`asd.${message.guild.id}.${author.id}`);
                        data.delete(
                          `asd.${message.guild.id}.${s.id}.${author.id}`
                        );
                      }, 5000);
                    });
                  });
                });
              });
            });
          });
        });
      });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yöneticitalep"],
  permLevel: 2
};

exports.help = {
  name: "yöneticitalep"
};
