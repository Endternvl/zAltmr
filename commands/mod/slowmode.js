const ms = require('ms');
const humanize = require('humanize-duration');
const sendError = require('../../mores/error')
const sendDone = require('../../mores/success')

module.exports = { // export module
  name: 'slowmode',
  description: 'set a slowmode',
  usage: 'slowmode <number>',
  aliases: ['setslowmode'],

  run: async(client,message,args) => {
  
    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_CHANNELS")) { // check perms
       sendError(`You Don't Have Permission To Use \`slowmode\` command.`, message.channel)// if user has no these perms return
       return// return
      }
      if (!message.guild.me.hasPermission("ADMINISTRATOR") || !message.guild.me.hasPermission("MANAGE_CHANNELS")) { // check perms
       sendError(`I Don't Have Permission To Use \`slowmode\` command.`, message.channel)// if user has no these perms return
       return// return
      }

    let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel; // if user didn't mention channel then, replace whit current channel

    let time = message.mentions.channels.first() ? args[1] : args[0]; // if user didn't mentioned a channel, replace to the first args

    if(time === 'reset' || time === 'off' || time === 'clear') {  // set off slowmode || .slow off then
      if (channel.rateLimitPerUser < 1) { // if channel slowmod is < 1 return msg
        sendError('Is Already OFF', message.channel)
        return
      } // else if not then
      await channel.setRateLimitPerUser(0); // set to 0 = slowmode off then
      return sendDone('Slowmode was desactivated.', message.channel) // if susseful then send msg
    }


    if(!time) { // if invalid time then return
      sendError('Please Insert A Time! **EX: `1m`**', message.channel) // msg
      return // return
    }

    let toMS = ms(time); 
    let result = Math.floor(toMS / 1000);

    if (!result) {// if invalid time then return
      sendError('Please Inset A Valid Time', message.channel)
      return
    }

    if (result > 21600) { // if time is > 21600 = 6h then return msg
      sendError('Time should be less or equal than 6 hours!', message.channel)
      return
    }// else if
    else if (result < 1) { // time is < 1 = 1 Return msg
      sendError('Time Should be more than 1', message.chanel)
      return
    }

    await channel.setRateLimitPerUser(result);// set slowmode to Channel 
    return sendDone(`<#${channel.id}> is now in slowmode for ${humanize(toMS)}`, message.channel)// if susseful then send msg

  }
}
