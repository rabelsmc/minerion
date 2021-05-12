const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

if (!args[0]) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<:mesajat:828207455792136192> **|** Lütfen komutu doğru kullan. \n Örnek : ``!mod ver/sil/liste``")
        .setColor('GREEN')
message.channel.send(basari)
return;
}
if (args[0] === 'ver'){


  if(!args[1]) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<:mesajat:828207455792136192> **|** Moderator vereceğin kişiyi etiketlemelisin.")
        .setColor('GREEN')
message.channel.send(basari)

return
}
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("<:batuhan:828215865048039435> **|** Başarılı bir şekilde **" + args[1] + "** kişisine moderator verildi.")
  message.channel.send(embed)
db.set(`${message.guild.id}.moderators.${message.mentions.users.first().id}`, true)
}

if (args[0] === 'sil'){

  if(!args[1]) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<:mesajat:828207455792136192> **|** Moderator alacağın kişiyi etiketlemelisin.")
        .setColor('GREEN')
message.channel.send(basari)

return
}
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("<:batuhan:828215865048039435> **|** Başarılı bir şekilde **" + args[1] + "** kişisinden moderator alındı.")
  message.channel.send(embed)
db.delete(`${message.guild.id}.moderators.${message.mentions.users.first().id}`)
}

if (args[0] === 'liste'){

let userlıst = db.get(`${message.guild.id}.moderators.${message.author.id}`).map(sa => sa.id)

  const embed = new Discord.MessageEmbed()
    .setColor("ORANGE")
.setTitle("Sunucudaki Moderatörler")
       .setDescription(``)  
  message.channel.send(embed)
}

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['modver'],
    permLevel: 3,
      
}

exports.help = {
    name: 'mod',
    description: 'prever',
    usage: 'prever',

} 