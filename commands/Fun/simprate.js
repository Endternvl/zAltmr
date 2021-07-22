const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "simprate",
    aliases: ["simp", "howsimp"],
    category: "fun",
    description: "Gives the simprate of the user !!",
    example: `sz!simprate @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const simprate = Math.floor(Math.random() * 101)

        if(!user)
        return message.reply(`:x: Provide a valid user from this guild !!`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`<a:simp:834243348167524360> Simprate`)
        .setDescription(`${user} (\`${user.user.tag}\`) is ${simprate} % Simp !! <a:simp:834243348167524360>`)
        .setTimestamp()

        message.channel.send(embed)
    }
}