const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bannedusers',
    category : 'moderation',
    aliases : ['fetchBans', 'banneds'],
    description : 'This command allows you to know the users who have been banned in the server.',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("sorry you need permission = `BAN_MEMBERS`");
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("I do not have permission = `BAN_MEMBERS`");
    }

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map ((member) => member.user.tag)
        .join(", ");
        const embed = new MessageEmbed()
        .setTitle(":hammer_pick: Banned users:")
        .setDescription(bannedMembers)
        .setColor("FF0000")
        .setTimestamp()

        message.channel.send(embed);
    },

};