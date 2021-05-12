const Discord = require('discord.js'); 
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix

module.exports.run = async(client, message, args) => {
 
  let sayfalar = [`
      
      > <a:krmzbalance:830219714683994182> ${prefix}ban @kullanıcı **• ?ban @kullanıcı sebep şeklinde ban atabilirsiniz.**
      > <a:krmzbalance:830219714683994182> ${prefix}unban **• Sunucudan yasakladığınız bir kullanıcının banını geri açarsınız.**
      > <a:krmzbalance:830219714683994182> ${prefix}mute **• Etiketlediğiniz kişiyi susturursunuz** 
      > <a:krmzbalance:830219714683994182> ${prefix}warn **• ?warn ver @kullanıcı birisine uyarı verirsiniz.**`];
   let page = 1;
  const embed = new Discord.MessageEmbed()
    .setTitle("Melodia") 
    .setColor("#f30707")
    .setFooter(`Sayfa ${page} - ${sayfalar.length}`) 
    .setDescription(sayfalar[page-1])
    .setTimestamp()
 
    message.channel.send(embed).then(msg => { 
   
      msg.react('').then( r => { 
       msg.react('') 
     
       const backwardsFilter = (reaction, user) => reaction.emoji.name === '' && user.id === message.author.id;
       const forwardsFilter = (reaction, user) => reaction.emoji.name === '' && user.id === message.author.id;
      
       const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
       const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });  
     
      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
        embed.setTitle("Sectra Yetkili Menüsü")
        embed.setDescription(sayfalar[page-1]); 
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#f30707")
        embed.setTimestamp()
        embed.setImage('https://cdn.discordapp.com/attachments/830405951198461962/832560425978822666/unknown.png')
        msg.edit(embed) 
      })
     
      forwards.on('collect', r => { 
        if (page === sayfalar.length) return; 
        page++; 
        embed.setTitle("Sectra Yetkili Menüsü")
        embed.setDescription(sayfalar[page-1]); 
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("#f30707") 
        embed.setTimestamp()
        embed.setImage('https://cdn.discordapp.com/attachments/830405951198461962/832560425978822666/unknown.png')
        msg.edit(embed) 
      })
   
    })
 
  })
 
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'yetkiliiiii',
  description: 'Yetkili komutlarını gösterir.',
  usage: 'yetkiliiii'
};