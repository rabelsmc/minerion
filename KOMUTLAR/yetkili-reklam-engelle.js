const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client()
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484');

var prefix = ayarlar.prefix;
exports.run = async (bot, message, args) => {  
  if (!args[0]) return message.channel.send(`<:mbbs:827571881287876628> Bu komutu kullanmak için aç yada kapat yazmalısın Örnek: ${prefix}reklam-engelle aç / kapat!`)
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<:mbbs:827571881287876628> `ÜYELERİ_YASAKLA` yetkisine sahip olmalısın!')
  
if (args[0] == 'aç') {
    var replace = await db.set(`reklamengl_${message.guild.id}`, 'acik')
      const reklamac = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription('<:mbbs:827571881287876628> Reklam Engelleme sistemi başarıyla açıldı. Artık kimse reklam yapamayacak')
      message.channel.send(reklamac);
    }
  
  if (args[0] == 'kapat') {
    var replace = await db.set(`reklamengl_${message.guild.id}`, 'kapali')
      const reklamkapat = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription('<:mbbs:827571881287876628> Reklam Engelleme sistemi başarıyla kapatıldı. Sunucuda reklam yapabilecekler.')
      message.channel.send(reklamkapat);
    }
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reklam-engelle',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};