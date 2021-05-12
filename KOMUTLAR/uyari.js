const Discord = require('discord.js');
const fs = require('fs');
const db = require("quick.db")
exports.run = (client, message, args) => {

if (!args[0]) {
        const basari = new Discord.MessageEmbed()
    .setDescription("<a:krmzbalance:830219714683994182> **|** Lütfen komutu doğru kullan. \n Örnek : ``!uyarı ver/liste/sil <kullanıcı>``")
        .setColor('GREEN')
message.channel.send(basari)
return;
}

if(args[0] === 'ver') {

const insan = message.mentions.users.first() || message.guild.members.cache.find(a =>a.id == args[1])
if(!insan) {
const embed = new Discord.MessageEmbed()
.setDescription("<a:krmzbalance:830219714683994182> **|** Uyarıcağınız kişiyi etiketleyiniz.")
.setColor("BLUE")

return message.channel.send(embed)
}
  const eben = args.slice(2)
  if(!eben) {
const embed = new Discord.MessageEmbed()
.setDescription("<a:krmzbalance:830219714683994182> **|** Sebep girmelisiniz.")
.setColor("BLUE")

return message.channel.send(embed)
}
if(!db.fetch(`uyarı_${message.guild.id}_${insan.id}_sebeb`)){
  db.set(`uyarı_${message.guild.id}_${insan.id}_sebeb`,[])
}
  const sayı = db.fetch(`uyarı_${message.guild.id}_${insan.id}_sayı`) || 1
    db.add(`uyarı_${message.guild.id}_${insan.id}_sayı`,1)
  db.set(`uyarı_${message.guild.id}_${insan.id}_${sayı}_sebeb`,eben)

  db.push(`uyarı_${message.guild.id}_${insan.id}_sebeb`,{sebeb:eben})
 const embed = new Discord.MessageEmbed()
.addField("\ Uyaran Yetkili", `<@${message.author.id}>`, true)
.addField("\ Uyarı Yiyen Kullanıcı ",`<@${insan.id}>`)
.addField("\ Uyarı Sayısı", `${sayı}`, true) 
 message.channel.send(embed)

  
} 
  if(args[0] === "sil"){
    const insan = message.mentions.users.first() || message.guild.members.cache.find(a =>a.id == args[1])
if(!insan) {
const embed = new Discord.MessageEmbed()
.setDescription("<a:krmzbalance:830219714683994182> **|** Uyarısını sileceğiniz kişinin id'sini giriniz")
.setColor("BLUE")

return message.channel.send(embed)
}
 

  const sayı = db.fetch(`uyarı_${message.guild.id}_${insan.id}_sayı`)|| 0
  db.add(`uyarı_${message.guild.id}_${insan.id}_sayı`,-1)
 const silme = db.fetch(`uyarı_${message.guild.id}_${insan.id}_${sayı+1}_sebeb`)
 let kerem = []
 db.fetch(`uyarı_${message.guild.id}_${insan.id}_sebeb`).map(c => c.sebeb).forEach(osman =>{
   if(osman === silme) return 
   kerem.push(osman)
   
 })
     db.set(`uyarı.${message.guild.id}.${insan.id}.sebeb`,kerem)
 const embed = new Discord.MessageEmbed()
.addField(`\`•\` Uyarayi Silen Yetkili`, `<@${message.author.id}>`, true)
.addField(`\`•\` Uyarı Yiyen Vatandaş `,`<@${insan.id}>`)
.addField(`\`•\` Uyarı Sayısı`, `${db.fetch(`uyarı.${message.guild.id}.${insan.id}.sayı`)|| 0}`, true) 
 message.channel.send(embed)
    
  }
  if(args[0] === "liste"){
     const insan = message.mentions.users.first() || message.guild.members.cache.find(a =>a.id == args[1])
if(!insan) {
const embed = new Discord.MessageEmbed()
.setDescription("<a:krmzbalance:830219714683994182> **|** Uyarı bilgisini görmek istediğiniz kişinin id'sini girmelisin.")
.setColor("BLUE")

return message.channel.send(embed)
}
   const eben = args.slice(2)


  const sayı = db.fetch(`uyarı_${message.guild.id}_${insan.id}_sayı`)|| 0

const embed = new Discord.MessageEmbed()
.addField(`<a:krmzbalance:830219714683994182> **|** Kişi `,`<@${insan.id}>`)
.addField(`<a:krmzbalance:830219714683994182> **|** Uyarı `,`${sayı}`)



message.channel.send(embed)

  
  }


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warn", "uyarı"],
  permLevel: 2,
};

exports.help = {
  name: 'uyar',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'Uyar [@kullanıcı] [<sebep>]'
};