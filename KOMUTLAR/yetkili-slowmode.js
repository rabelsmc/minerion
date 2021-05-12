const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db');
const client = new Discord.Client()
client.emojis.cache.get('784518934711762976');
client.emojis.cache.get('784518943423463484');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {  
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("<:mbbs:827571881287876628> Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmanız gerek.");
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.MessageEmbed()
      .setDescription(`Doğru kullanım: \`${prefix}yavaşmod [0/10]\``)
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embed });
    return;
  }
  if (limit > 10) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("<:mbbs:827571881287876628> Süre limiti maksimum **10** saniye olabilir.")
        .setColor("RANDOM")
    );
  }
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(`<:mbbs:827571881287876628> Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`)
      .setColor("RANDOM")
  );
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "yavas-mod", "yavasmod", "yavaşmod"],
  permLevel: 1
};
 
exports.help = {
  name: "slowmode",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "slowmode [1/10]"
};