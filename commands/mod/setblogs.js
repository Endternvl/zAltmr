const { MessageEmbed, Collection } = require('discord.js');
const db = require("../../mongodels/boost.js");
const sendError = require('../../mores/error');

module.exports = {
    name : 'setboostchannel',
    aliases: ["setbc", "setboostchannel", "setboostc"],
    description : 'Setup the booster message channel!!',
    bot: ['SEND_MESSAGES', 'MANAGE_GUILD'],

    run : async(client, message, args) => {
      if(!message.member.permissions.has("ADMINISTRATOR")) return sendError('You do not have admin perms to use this command!', message.channel);

      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

      if(!channel) return sendError('Please provide the channel!', message.channel);

      await db.findOne({ guild: message.guild.id }, async(err, data) => {
        if(!data) {
          data = new db({
            guild: message.guild.id,
            channel: channel.id
          }).save();
          message.channel.send(`The booster message channel has been set as ${channel}!`)
        } else {
          data.channel = channel.id;
          await db.findOneAndUpdate({ guild: message.guild.id });
          message.channel.send(`The booster message channel has been update to ${channel}!`)
        }
      })

    } 
}