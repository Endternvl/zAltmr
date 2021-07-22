//This one is for the music error. alright?
const Discord = require('discord.js')

module.exports = async (text, channel) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Um Eh,")
    .setDescription("<a:invalid:832421000783986728> • " + text)
    .setFooter(`MusicError • An Error Occurred`)
    .setColor("RED")
    await channel.send(embed)
}