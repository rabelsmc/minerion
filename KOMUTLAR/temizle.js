const Discord = require('discord.js');

exports.run = async(yashinu, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için "MESAJLARI YÖNET" iznine sahip olmalısın!`);
  if (!args[0] || isNaN(args[0])) return message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(`<@${message.author.id}> Temizlenecek mesaj miktarını belirtmelisin! (En Fazla 300)`));
  message.delete({ timeout: 1 });
  let rexussayi = Number(args[0]);
  let rexussilinen = 0;
  for (var i = 0; i < (Math.floor(rexussayi/100)); i++) {
   message.channel.bulkDelete(100).then(r => rexussilinen+=r.size);
    rexussayi = rexussayi-100;
  };
  if (rexussayi > 0)  message.channel.bulkDelete(rexussayi).then(r => rexussilinen+=r.size);
  message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(`<a:yesilblnc:830229032414085120> **|** **Başarıyla** \`\`${args[0]}\`\` **adet mesaj sildim**`))
.then(m => m.delete({timeout: 5000}));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["temizle", "sil"],
  permLevel: 0
};

exports.help = { 
  name: 'sil', 
  description: 'Belirtilen miktarda mesajı temizler. (Sınırsız)',
  usage: 'sil <miktar>',
  kategori: 'yetkili'
};