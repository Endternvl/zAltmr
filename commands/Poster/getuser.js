const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'getytuser',
    aliases: ['ytuser'],
    category: 'yt_poster',
    description: 'Get all setup Channels of a USER',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) user = message.author;

        //get all channels for a User, instead of using a Link
        client.YTP.getChannels4User(message.guild.id, user.user).then(chs => {
            message.channel.send(
                new MessageEmbed()
                   .setColor("GREEN")
                    .setDescription(`**__All Links__**\n\`\`\`${chs.map(ch => ch.YTchannel).join("\n")}\`\`\``))
                    .setAuthor(message.author.tag)
                    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
        }).catch(e => {
            console.log(e);
            message.channel.send(`${e.message ? e.message : e}`, {
                code: "js"
            })
        })

    }
}