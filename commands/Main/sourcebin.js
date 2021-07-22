const sb = require('sourcebin_js');
const { default_prefix } = require("../../config.json")
const { MessageEmbed } = require("discord.js");

module.exports = {
   name: 'sourcebin',
   category: 'main',
   usage: 'sourcebin <code>',
   description: 'Sourcebin',
   run: async (client, message, args) => {
     let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;

       let content = args.join(' ');
        if (!content)
            return message.reply(
                new MessageEmbed({
                    title: 'Error Usage! Please Follow The Usage!',
                    description: `Usage: ${prefix}sourcebin <code>`
                })
            );

        const value = await sb.create([
            {
                title: `A Code From User In ${message.guild.name}`,
                name: `code from ${message.author.tag}`,
                content,
                language: 'javascript',
            }
        ]);
        await message.reply(
            new MessageEmbed()
                .setTitle('Sourcebin')
                .setDescription(`Here is your code: ${value.url}`)
                .setColor("#9B2335")
                .setFooter(`Code From By ${message.author.tag} and uploaded by ${client.user.tag} in sourcebin`)
        );
    }
};
