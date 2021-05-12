const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => { 
var time = moment().format('Do MMMM YYYY , hh:mm');
var room;
var title;
var duration;
var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
var filter = m => m.author.id === message.author.id;



      message.channel.send(`<:mb:827571154352865281> | **Çekilişin yapılacağı kanalın adını yaz**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.cache.find(x => x.name ===  collected.first().content);
        if(!room) return message.channel.send('<:mb:827571154352865281> **Görünülürde böyle bir kanal bulamadım**');
        room = collected.first().content;
        collected.first().delete();
        msg.edit('<:mb:827571154352865281> **Çekilişin süresini belirle (1s, 1m, 1h, 1d, 1w)**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('<:mb:827571154352865281>  **Görülünürülüşe göre böyle bir süre bilmiyorum**');
            duration = collected.first().content
            collected.first().delete();
            msg.edit('<:mb:827571154352865281> **Şimdi de ödülü yaz bakalım**').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.MessageEmbed()
                  .setColor("#f558c9")
                  .setDescription(`**Ödül: ${title}** \n🎉'a Basarak Katıl \nKalan Süre : ${duration} \n **Başlama Zamanı :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  .setFooter(message.author.username + " Melodia", message.author.avatarURL);
                  message.guild.channels.cache.find(x => x.name ===  room).send(' <:mb:827571154352865281> **ÇEKİLİŞ BAŞLADI** <:mb:827571154352865281>' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.cache.get("🎉").users
                       let list = users.cache.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.MessageEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .setColor("#f558c9")
            .setFooter("Melodia")
                       .addField('Çekiliş Bitti !🎉',`Kazanan : ${gFilter} \nBitiş zamanı :`)
                       .setTimestamp()
                     m.edit('** 🎉 ÇEKİLİŞ BİTTİ 🎉**' , {embed: endEmbed});

                       var embedLel = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("Ödülünü Moderatörleri Etiketleyerek Alabilirsin!").setFooter("Melodia")
                        message.guild.channels.cache.find(x => x.name ===  room).send(`:tada: **Tebrikler ${gFilter}! \`${title}\` kazandın!**` , embedLel)                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`<:mb:827571154352865281> **Maalesef gerekli yetkilerim bulunmamakta**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: 'çekiliş',
  description: 'Çekiliş mi?? Sunucunda güzel şeyler olacak :3',
  usage: 'çekiliş'
};