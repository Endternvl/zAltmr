const premiumSchema = require("../../mongodels/premium");
const { Client, Message, MessageEmbed } = require('discord.js');
const { dev } = require('../../config.json');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'add-premium',
  aliases: ['addpremi'],
  usage: 'add-premium [USER]',
  description: 'add premium to a user (OWNER ONLY)',

  run: async(client, message, args) => {
    if(!message.author.id === "787842689969684480"){
      return sendError('This command is only for <@787842689969684480>', message.channel)
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!member){
      return sendError('Please specify a valid member!', message.channel)
    }

    premiumSchema.findOne({
      User: member.id
    }, async (err, data) => {
      if(data) return sendError('This user already have/gained premium features!', message.channel)

      new premiumSchema({
        User: member.id
      }).save();
        return sendDone('Now This User Can Access Premium Commands And Other Features!', message.channel)
    })
  }
}