const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');
const Discord = require('discord.js');
const db = require('quick.db')
const Guild = require("../../models/log");

module.exports = {
  name: 'setserverlogs',
  description: 'set a serverlogs channel to a current server.',
  usage: '<CHANNEL>',

  run: async(client, message, args) => {
    const channel =
        message.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(
          c => c.name.toLowerCase() === message.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return sendError("Please Enter A Valid Text Channel!", message.channel);

      const guild1 = message.guild;
      let webhookid;
      let webhooktoken;
      await channel
        .createWebhook(guild1.name, {
          avatar: guild1.iconURL({ format: "png" })
        })
        .then(webhook => {
          webhookid = webhook.id;
          webhooktoken = webhook.token;
        });

      await Guild.findOne(
        //will find data from database
        {
          guildID: message.guild.id
        },
        async (err, guild) => {
          if (err) console.error(err);
          if (!guild) {
            // what the bot should do if there is no data found for the server
            const newGuild = new Guild({
              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              guildName: message.guild.name,
              logChannelID: channel.id,
              webhookid: webhookid,
              webhooktoken: webhooktoken
            });

            await newGuild
              .save() //save the data to database(mongodb)
              .then(result => console.log(result))
              .catch(err => console.error(err));

            client.send(
              `**Done**\nServer logs channel has been setted as ${channel}`,
              message
            );
          } else {
            guild
              .updateOne({
                //if data is found then update it with new one
                logChannelID: channel.id,
                webhooktoken: webhooktoken,
                webhookid: webhookid
              })
              .catch(err => console.error(err));

            return sendDone(
              `The log channel has been updated to ${channel}`,
              message.channel
            );
          }
        }
      );
  }
}