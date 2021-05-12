const Discord = require('discord.js');

exports.run = (client, message, args) => {

  const uye = message.mentions.members.first();
  const sıra = args[1]
  const tarih = args[2]
  const urun = args.slice(3).join(' ')

  const hata = new Discord.RichEmbed()
  .setColor(`40009e`)
  .setDescription(`**Doğru Kullanım:** m!kayıt [@Üye] [Sipariş No] [Tarih] [Ürün]`)

  if (!uye) return message.channel.send(hata).then(msg => msg.delete(5000))
  if (!urun) return message.channel.send(hata).then(msg => msg.delete(5000))
  if (!sıra) return message.channel.send(hata).then(msg => msg.delete(5000))
  if (!tarih) return message.channel.send(hata).then(msg => msg.delete(5000))

  message.delete();

  const embed = new Discord.RichEmbed()
  .setColor(`40009e`)
  .setAuthor(`Melodia - 2021`)
  .setTitle(`Melodia`)
  .setURL('https://www.behance.net/byregular')
  .addField(`** **`, `**Müşteri**: ${uye} \n$**Ürün**: ${urun} \n$**Sipariş No**: ${sıra} \n$**Tarih**: ${tarih}`)
  .addField(`** **`, `${uye} Melodia ekibinden **${urun}** Satın almıştır hayırlı olsun.`)
  .setThumbnail(uye.user.avatarURL)
  return message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit', 'kayıt'],
  permLevel: 4
};

exports.help = {
  name: 'sipariş',
};