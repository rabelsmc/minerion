const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

message.channel.send("Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520>").then(message => {

    var FwhyCode = [

      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> ",
      "Bu komut __kurumsallığı__ bozduğu için kaldırıldı <:kitap:837156072477032520> "

    ];

    var FwhyCode = FwhyCode[Math.floor(Math.random() * FwhyCode.length)];

    message.edit(`${FwhyCode}`);
  
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kaçcm", "cmkaç", "kaçcm", "cm-kaç"],
  permLevel: 0
};

exports.help = {
  name: "kaç-cm",
  description: "Malafatını Söyler.",
  usage: "kaçcm"
};