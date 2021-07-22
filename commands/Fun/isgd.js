const { Client, Message, MessageEmbed } = require('discord.js');
let isgd = require('isgd')
const sendError = require('../../mores/error')
const sendDone = require('../../mores/success')
module.exports = {
    name: 'isgd',
    aliases: ['shorten1'],
    description: 'Shorten a url',
    usage: '<url>',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
    if(!args[0]) return sendError(`Incorrect usage! ${client.prefix}shorten <url> [title (optional)]`, message.channel)

    if(!args[1]){
      isgd.shorten(args[0], function(res){
        if(res.startsWith('Error:')) return sendError(`Please enter a valid url!`, message.channel)

        sendDone(`Here is the url:\n${res}`, message.channel)
      })
    } else {

        isgd.custom(args[0], args[1], function(res) {
            if(res.startsWith(`Error:`)) return sendError(` An error has occured: ${res}`, message.channel)

            sendDone(`Here is the url:\n${res}`, message.channel)
        })

    }
    }
}