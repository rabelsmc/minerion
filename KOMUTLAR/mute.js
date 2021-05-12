const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")

exports.run = async (bot, message, args) => {

  if (!db.has(`${message.guild.id}.moderators.${message.author.id}`) == true) {
    
        const alpembed = new Discord.MessageEmbed()
      .setDescription("<:mesaj:828207455792136192> **|** Mute komutunu kullanamazsın. Sunucu sahibi tarafından moderator olarak atanmalısın!")
      .setColor('RED')
    return message.channel.send(alpembed)
  } else {
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<:mesaj:828207455792136192> **|** Lütfen komutu doğru kullan. \n Örnek : ``m!mute <kullanıcı> <süre>`` \n <:elmas:828215865048039435> **|** Mute rolünü otomatik oluşur!. \n\n \n<:elmas:828215865048039435> Mute Süreleri \n\`•\` 1 Saniye: 1s \n \`•\` 1 Dakika: 1m \n \`•\` 1 Saat: 1h \n \`•\`1 Gün: 1d")
        .setColor('GREEN')
message.channel.send(basari)
return;
}
let muterole = message.guild.roles.cache.find(r => r.name === "Mute");

  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "Mute",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.createOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<:mesaj:828207455792136192> **|** Lütfen komutu doğru kullan. \n Örnek : ``m!mute <kullanıcı> <süre>`` \n <:elmas:828215865048039435> Mute rolünü otomatik oluşur!.")
        .setColor('GREEN')
message.channel.send(basari)
return;
}

  await(tomute.roles.add(muterole.id));
const embed = new Discord.MessageEmbed()
 .setDescription(`<:mesaj:828207455792136192> **|** Başarılı**\n\n<:mesaj:828207455792136192> **|** <@${tomute.id}> Kullanıcı başarılı şekilde mutelendi. \n<:mesaj:828207455792136192> **|** Mute süresi; ${ms(ms(mutetime))}`)
message.channel.send(embed)

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
const embed = new Discord.MessageEmbed()
    .setDescription(`<:mesaj:828207455792136192> **|** <@${tomute.id}> Kişinin susturulma süresi doldu!\n<:mesaj:828207455792136192> **|** \`Mute\` rolü alındı!`)
message.channel.send(embed)  
}, ms(mutetime));

}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Sureli Susturur.',
  usage: 'geçici-sustur [Kullanıcı] [Süre]'
};