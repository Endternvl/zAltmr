const Discord = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
    name: 'tatoo',
    category: 'Image',
    usage: 'tatoo',
    description: 'tatoo **MEME**',
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        let image = await new DIG.Tatoo().getImage(avatar)
        let attach = new Discord.MessageAttachment(image, 'tatoomeme.png');;
        message.channel.send(attach)
    }
}
