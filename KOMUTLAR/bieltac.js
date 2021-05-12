const Discord = require("discord.js");
const data = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {  
  const Spectrum = new Set();

  if (Spectrum.has(message.author.id)) {
           return message.channel.send("Bu komutu kullanmak için lütfen `10` dakika bekleyiniz. - " + message.author);
    } else {
        Spectrum.add(message.author.id);
        setTimeout(() => {
        message.delete();
          Spectrum.delete(message.author.id);
        }, 600000);// milisaniye cinsinden
    } 
  const prefix =
    (await data.fetch(`prefix.${message.guild.id}`)) || ayarlar.prefix;
  const ad = await data.fetch(`numara.${message.channel.id}`);
  if (
    message.channel.name === `sipariş-${ad}` ||
    message.channel.name === `kapatıldı-${ad}`
  ) {
    const ann = await data.fetch(
      `asd.${message.guild.id}.${message.channel.id}.${message.author.id}`
    );
    if (!ann) return message.channel.send(`Bu sipariş senin değil.`);
    message.delete();

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#ff4400")
        .setDescription(`Sipariş talebi ${message.author} tarafından açıldı.`)
    );
    message.channel.setName(`sipariş-${ad}`);
    
  } else {
    return message.channel.send(
      new Discord.MessageEmbed()
      .setDescription(`Bu komutu bir bilet kanalında kullanın.`));
  }
};
exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: ["bilet-aç"],
  permLevel: 0
};

exports.help = {
  name: "aç"
}; 
