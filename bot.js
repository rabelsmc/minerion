const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
client.emojis.cache.get('785437821926113290');
client.emojis.cache.get('785437821435117608');
//-----------------------------------------------\\

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4; 
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.mine(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.mine(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.mine(regToken, "that was redacted")));
});

client.login(ayarlar.token);
//---------------------------------|Komutlar|---------------------------------\\
//---------------------------------|Otorol Sistemi Başlangıç|---------------------------------\\
client.on('guildMemberAdd', (member) => {
  let kanal = db.fetch(`otorolk.${member.guild.id}`);
  let rol = db.fetch(`otorol.${member.guild.id}`);

  if(!kanal) return;
  if(!rol) return;
  member.roles.add(`${rol}`)
  member.guild.channels.cache.get(`${kanal}`).send(`${member} Melodia sunucusuna hoşgeldin. <:girdi:827293136870178856>`)

});
//---------------------------------|Otorol Sistemi Son|---------------------------------\\
//---------------------------------|Reklam-Engelle Başlangıç|---------------------------------\\
client.on("message", async msg => {
 var mine = await db.fetch(`reklamengl_${msg.guild.id}`)
    if (mine == 'acik') {
       const reklam = [".com", ".net", ".https", ".http", ".io", "discord.gg", ".gg", ".tk", ".pw", ".party", ".xyz", ".me", "www.", "https", "http", ".gl", ".com.tr", ".tr", ".batihost", ".network", ".rf", ".gd", ".rf.gd", ".org", ".az"]
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete({ timeout: 1 });
              return msg.reply('Melodia discord sunucusunda reklam yasaklanmıştır.').then(msg => msg.delete({ timeout: 1500 }));

  msg.delete(3000);                

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (mine == 'kapali') {
      
    }
    if (!mine) return;
  })
  ;
//---------------------------------|Reklam-Engelle Son|---------------------------------\\
//---------------------------------|Küfür-Engelle Başlangıç|---------------------------------\\
const küfür = ["domal", "abaza", "orospu", "oruspu", "orospu çocu", "oruspu çocu", "oruspu çcocu", "oruspu", "çocu", "allah", "anneni", "sikeyim", "siktim", "aq", "a.q", "skcm", "soktum", "domalttım", "allahını sikeyim", "babanı sikeyim", "babanım", "köpek", "kahpe", "şerefsiz", "yüzsüz", "orospunun çocu", "evladı", "oç", "oçe", "oc", "oce", "0ç", "mk", "mk evladı", "mk çocu", "mçık", "amçık", "yarak", "yarrak", "piç", "pic", "hoşaf kapalı", "yarramın başı", "sik", "salak", "sik kafalı", "anneni severim", "annen", "anneni", "ananı", "ananı sikerim", "sikerim", "skrm", "söverim", "skcm", "mcık", "mcik", "mını yerim", "m kafası", "kafası", "orospo zozo", "orospo", "ORROSPU", "orr", "mcok", "mono sokom", "orozpu", "orozpo", "mzik", "mzik şafı", "şafi", "aptal", "rganik orzbu", "rganik ovuspu"];
client.on("messageUpdate", async (old, nev) => {

    if (old.content != nev.content) {
        let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
        let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
        if (i) {

            if (küfür.some(word => nev.content.includes(word))) {
                if (nev.member.hasPermission("BAN_MEMBERS")) return;
                //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
                const embed = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${nev.author} , **Melodia sunucusunda küfür yasaktır.**`)
                    .addField("Küfür:", nev)

                nev.delete();
                const embeds = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${nev.author} , **Mesajı editle küfür etmekmi?**`)
                client.channels.cache.get(y).send(embed)
                nev.channel.send(embeds).then(msg => msg.delete({
                    timeout: 5000
                }));

            }
        } else {}
        if (!i) return;
    }
});

client.on("message", async msg => {


    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
    if (i) {
        if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
            try {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
                    msg.delete({
                        timeout: 750
                    });
                    const embeds = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`<@${msg.author.id}> , **<a:yesilblnc:830229032414085120> Melodia sunucusunda küfür yasaktır.**`)
                    msg.channel.send(embeds).then(msg => msg.delete({
                        timeout: 5000
                    }));
                    const embed = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${msg.author} , **<a:yesilblnc:830229032414085120> Melodia sunucusunda küfür yasaktır.**`).addField("Mesajı:", msg)
                    client.channels.cache.get(y).send(embed)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    if (!i) return;
});
//---------------------------------|Küfür-Engelle Son|---------------------------------\\

//MİSİNG//
const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

client.on('message', async msg => {
let sahip = 'id'
  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.id === '835690405999542342') { 
    if(msg.author.id === sahip) return
    if(msg.author.bot) return
    
    if(msg.guild.channels.get(await db.fetch(`destek_${msg.author.id}`))) {
      msg.delete()
      return msg.guild.channels.get(await db.fetch(`destek_${msg.author.id}`)).send(msg.author + " zaten bir destek talebin bulunmakta!")
    } 
    if(msg.guild.channels.get('835690405999542342')) {// kanalid
      msg.guild.createChannel(`talep-${msg.author.username}`, "text").then(async c => {
        db.set(`destek_${msg.author.id}`, c.id)
      const category = msg.guild.channels.get('835690317247414292') // Kategori id
      c.setParent(category.id)
      let role = msg.guild.roles.get("838759957616656385");//Rol id
      let role2 = msg.guild.roles.find("name", "@everyone");
      await c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      await c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      await c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("#f0393b")
      .addField(`<:kitap:837156072477032520> Talep Konusu:`, `${msg.content}`, true)
      .addField(`<:kullanici:837136843832164362> Kullanıcı:`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username}`)
      .setTimestamp()
      await c.send({ embed: embed });
      await c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @everyone`)
      msg.delete()
      db.set(`talep_${c.id}`, msg.content)
      db.set(`kullanici_${c.id}`, msg.author.id)
      }).catch(console.error);
    }
  }
});
  



client.on("message", message => {
if (message.content.toLowerCase() === "!kapat") {
    if (!message.channel.name.startsWith(`talep-`)) return
  
    let yetki = false;
  
    if (message.member.roles.has("838759957616656385")) yetki = true;
    else yetki = false;
  
  if (yetki == false) return message.channel.send("Destek taleplerini yalnızca yetkililer kapatabilir.");
  
    if(message.author.bot) return
    var deneme = new Discord.RichEmbed()
    .setColor("#f0393b")
    .setAuthor(`Destek talebi kapatma`)
    .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
    .setFooter(`${client.user.username} | Destek Sistemi`)
    message.channel.send(deneme)
    .then((m) => {
      message.channel.awaitMessages(response => response.content.toLowerCase() === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then(async (collected) => {
          message.channel.delete();
        const embed = new Discord.RichEmbed()
          .setTitle("")
          .setColor('#f0393b')
          .setDescription("Destek Kapatıldı")
          .addField("Kapatan Yetkili:", message.author)
          .addField("Kapatılan Kanal: ", "#" + message.channel.name)
          .addField("Talep Sebebi: ", "```" + await db.fetch(`talep_${message.channel.id}`) + "```")
          .setFooter("Melodia", client.user.avatarURL)
          client.channels.get("kapantınca atıcak kanal idsi").send("Bir __**kullanıcı destek talebi**__ kapatıldı", embed);
          db.delete(`talep_${message.channel.id}`)
        })
        .catch(() => {
          m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});


const _0x5a1f=['cache','channels','285BwvZud','1120630AXpRAU','arşiv-','toLowerCase','kapatılantalepSayısı','>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20','split','roles','Kapatmak\x20için:\x20!kapat\x20|\x20Destek\x20Sistemi','delete','setColor','evet','name','253170krxZDx','225105WqmnsX','guild','MessageEmbed','820wwiRuo','2707SWAXBQ','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Kapatan\x20Kullanıcı:\x20<@','destekKategori','destekKanalLog','message','**Destek\x20talebini\x20yetkililer\x20dışında\x20kimse\x20kapatamaz!**','error','\x0a\x20\x20\x20\x20**Destek\x20talebini\x20kapatmayı\x20onaylamak\x20için;**\x20\x0a\x20\x20\x20\x2010\x20saniye\x20içinde\x20`evet`\x20yazınız.\x0a\x0a\x20\x20\x20\x20\x20\x20','channel','add','send','edit','talepSayısı','catch','destek-','set','setName','>\x20(','user','\x20|\x20Destek\x20Sistemi','#f0393b','setDescription','destekYetkilisi','everyoneID','67GRYfzq','destekKanal','bot','create','createOverwrite','content','Destek\x20Talebi\x20kapatma\x20isteğin\x20zaman\x20aşımına\x20uğradı!','\x0a\x09\x20\x20\x0a\x09\x09**Talep\x20Konusu:**\x20','1CwbJXg','text','time','then','167084HcJkrU','destek_',')\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Kapatılan\x20Kanal:\x20<#','get','author','hasPermission','username','join','269987sLPfQw','destekLog'];const _0x377b32=_0x515f;function _0x515f(_0x20ca72,_0x565f38){_0x20ca72=_0x20ca72-0x96;let _0x5a1f9f=_0x5a1f[_0x20ca72];return _0x5a1f9f;}(function(_0x6da31f,_0x174379){const _0x2532a4=_0x515f;while(!![]){try{const _0x460cc6=-parseInt(_0x2532a4(0xaa))+-parseInt(_0x2532a4(0xd3))+-parseInt(_0x2532a4(0xaf))*-parseInt(_0x2532a4(0xc7))+parseInt(_0x2532a4(0xae))*-parseInt(_0x2532a4(0x9d))+-parseInt(_0x2532a4(0xcf))*parseInt(_0x2532a4(0x99))+-parseInt(_0x2532a4(0xab))+parseInt(_0x2532a4(0x9e));if(_0x460cc6===_0x174379)break;else _0x6da31f['push'](_0x6da31f['shift']());}catch(_0x506d46){_0x6da31f['push'](_0x6da31f['shift']());}}}(_0x5a1f,0x25579),client['on'](_0x377b32(0xb3),async _0x2dcae9=>{const _0x2c497c=_0x377b32,_0x42160b=_0x2dcae9[_0x2c497c(0xcc)][_0x2c497c(0xa3)]('\x20')['slice'](0x1)[_0x2c497c(0x98)]('\x20');if(_0x2dcae9[_0x2c497c(0xb7)]['id']===ayarlar[_0x2c497c(0xc8)]){if(_0x2dcae9['author'][_0x2c497c(0xc9)])return;if(_0x2dcae9[_0x2c497c(0xac)][_0x2c497c(0x9c)][_0x2c497c(0x9b)][_0x2c497c(0xd6)](ayarlar[_0x2c497c(0xc8)])){db[_0x2c497c(0xb8)](_0x2c497c(0xbb),0x1);let _0x146072=db[_0x2c497c(0xd6)](_0x2c497c(0xbb));_0x2dcae9[_0x2c497c(0xac)][_0x2c497c(0x9c)][_0x2c497c(0xca)](_0x2c497c(0xbd)+_0x146072,{'type':_0x2c497c(0xd0),'reason':'Destek\x20sistemi\x20için\x20oluşturuldu!'})[_0x2c497c(0xd2)](async _0x59b315=>{const _0x550fae=_0x2c497c,_0x1a0b68=_0x2dcae9[_0x550fae(0xac)][_0x550fae(0x9c)][_0x550fae(0x9b)][_0x550fae(0xd6)](ayarlar[_0x550fae(0xb1)]);db[_0x550fae(0xbe)](_0x550fae(0xd4)+_0x2dcae9['author']['id'],_0x59b315['id']),_0x59b315['setParent'](_0x1a0b68['id']);let _0x293ac5=_0x2dcae9[_0x550fae(0xac)]['roles'][_0x550fae(0x9b)][_0x550fae(0xd6)](ayarlar['destekYetkilisi']),_0x1ef3de=_0x2dcae9['guild']['roles'][_0x550fae(0x9b)][_0x550fae(0xd6)](ayarlar[_0x550fae(0xc6)]);await _0x59b315['createOverwrite'](_0x293ac5,{'SEND_MESSAGES':!![],'READ_MESSAGES':!![],'VIEW_CHANNEL':!![]}),await _0x59b315[_0x550fae(0xcb)](_0x1ef3de,{'SEND_MESSAGES':![],'READ_MESSAGES':![],'VIEW_CHANNEL':![]}),await _0x59b315[_0x550fae(0xcb)](_0x2dcae9[_0x550fae(0xd7)],{'SEND_MESSAGES':!![],'READ_MESSAGES':!![],'VIEW_CHANNEL':!![]});const _0x438771=new Discord[(_0x550fae(0xad))]()[_0x550fae(0xa7)](_0x550fae(0xc3))['setDescription'](_0x550fae(0xce)+_0x2dcae9[_0x550fae(0xcc)]+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Kullanıcı:**\x20<@'+_0x2dcae9[_0x550fae(0xd7)]['id']+_0x550fae(0xa2))['setFooter'](_0x550fae(0xa5));await _0x59b315[_0x550fae(0xb9)]({'embed':_0x438771}),await _0x59b315[_0x550fae(0xb9)]('<@'+_0x2dcae9[_0x550fae(0xd7)]['id']+'>\x20**destek\x20ekibi\x20en\x20kısa\x20sürede\x20seninle\x20ilgilenecek!**\x20<@&'+ayarlar['destekYetkilisi']+'>'),_0x2dcae9[_0x550fae(0xa6)]();})[_0x2c497c(0xbc)](console['error']);}}}),client['on']('message',_0x125439=>{const _0x3b3f26=_0x377b32;if(_0x125439[_0x3b3f26(0xcc)][_0x3b3f26(0xa0)]()==='!kapat'){if(!_0x125439[_0x3b3f26(0xb7)][_0x3b3f26(0xa9)]['startsWith'](_0x3b3f26(0xbd)))return;if(!_0x125439['member'][_0x3b3f26(0xa4)]['cache'][_0x3b3f26(0xd6)](ayarlar[_0x3b3f26(0xc5)])&&!_0x125439['member'][_0x3b3f26(0x96)]('ADMINISTRATOR'))return _0x125439[_0x3b3f26(0xb7)][_0x3b3f26(0xb9)](_0x3b3f26(0xb4));if(_0x125439[_0x3b3f26(0xd7)]['bot'])return;var _0x2458cd=new Discord[(_0x3b3f26(0xad))]()['setColor'](_0x3b3f26(0xc3))['setDescription'](_0x3b3f26(0xb6))['setFooter'](client[_0x3b3f26(0xc1)][_0x3b3f26(0x97)]+_0x3b3f26(0xc2));_0x125439[_0x3b3f26(0xb7)][_0x3b3f26(0xb9)](_0x2458cd)[_0x3b3f26(0xd2)](_0x127b77=>{const _0x25c21a=_0x3b3f26;_0x125439[_0x25c21a(0xb7)]['awaitMessages'](_0xa08775=>_0xa08775[_0x25c21a(0xcc)][_0x25c21a(0xa0)]()===_0x25c21a(0xa8),{'max':0x1,'time':0x2710,'errors':[_0x25c21a(0xd1)]})[_0x25c21a(0xd2)](async _0x9a0ed9=>{const _0x523530=_0x25c21a,_0x25d199=new Discord['MessageEmbed']()['setColor'](_0x523530(0xc3))[_0x523530(0xc4)](_0x523530(0xb0)+_0x125439['author']+_0x523530(0xc0)+_0x125439['author']+_0x523530(0xd5)+_0x125439[_0x523530(0xb7)]['id']+'>');client[_0x523530(0x9c)][_0x523530(0x9b)][_0x523530(0xd6)](ayarlar[_0x523530(0x9a)])['send']('Bir\x20__**yetkili\x20destek\x20talebini**__\x20kapattı.',_0x25d199),_0x125439[_0x523530(0xb7)]['setParent'](ayarlar[_0x523530(0xb2)]),_0x127b77[_0x523530(0xa6)](),_0x125439[_0x523530(0xa6)](),db[_0x523530(0xb8)](_0x523530(0xa1),0x1);let _0x4827cc=db[_0x523530(0xd6)](_0x523530(0xa1));_0x125439[_0x523530(0xb7)][_0x523530(0xbf)](_0x523530(0x9f)+_0x4827cc)[_0x523530(0xbc)](console[_0x523530(0xb5)]);})[_0x25c21a(0xbc)](()=>{const _0xf24b27=_0x25c21a;_0x127b77[_0xf24b27(0xba)](_0xf24b27(0xcd));});});}}));
