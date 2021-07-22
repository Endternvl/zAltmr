const Discord = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
    name: 'presentation',
    category: 'Image',
    usage: 'presentation <text for presentation>',
    description: 'presentation **MEME**',
    run: async(client, message, args) => {
        let text = args.join(" ");
        if(!args.length) return message.channel.send(`Usage: presentation <text>`)
        let image = await new DIG.LisaPresentation().getImage(text)
        let attach = new Discord.MessageAttachment(image, 'presentationmeme.png');;
        message.channel.send(attach)
    }
}
