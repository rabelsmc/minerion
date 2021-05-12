const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const request = require("request");

exports.run = async (client, message, args) => {

    let ip = args[0]

    if(!ip) return message.channel.send("Lütfen Bir IP Adresi Giriniz: !mc play.melodia.xyz")

    request("https://api.mcsrvstat.us/2/" + ip, function(error, response, body) {

        if(JSON.parse(body).online == true) {
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setFooter(ayarlar.footer)
            .setTimestamp()
            .setTitle(ip + " Sunucu Bilgileri")
            .addField(":boy: Aktiflik", JSON.parse(body).players.online, true)
            .addField(":rocket: Sunucu Durumu", JSON.parse(body).online ? "Aktif" : "Kapalı", true)
            .setThumbnail("https://api.mcsrvstat.us/icon/" + ip)
        message.channel.send(embed)
        }else{
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                .setTitle(ip + " Sunucu Bilgileri")
                .addField(":boy: Aktiflik", "0", true)
                .addField(":rocket: Sunucu Durumu", "Bulunamadı", true)
                .setThumbnail("https://cdn.discordapp.com/attachments/779301765169283083/800101738438721546/unknown.png")
            message.channel.send(embed)
        }

    })

    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mc"],
    permLevel: 0
};

exports.help = {
    name: 'mcistatistik',
    description: 'yardım.',
    usage: 'yardım'
};