const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'ohno',
    aliases: [''],
    usage: '[WORD]',
    category: 'Image',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const words= args.join(" ")

        const img = await Canvas.ohno(words)

        message.channel.send(
            new MessageAttachment(img, "owhno.png")
        )
    }
}