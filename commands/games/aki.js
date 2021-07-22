const { Client, Message, MessageEmbed } = require('discord.js');
const akinator = require('discord.js-akinator')
module.exports = {
    name: 'akinator',
    aliases: ['aki'],
    description: 'wanna play **AKI?**',
    usage: '<option>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        akinator(message, client)
    }
}