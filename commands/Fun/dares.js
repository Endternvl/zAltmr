const { MessageEmbed } = require('discord.js');
const f = require('node-fetch')
const embedcolor = "RANDOM"

module.exports = {
  name: 'dare',
  description: 'dares command',

  run: async (client, message, args) => {
    if (!args[0]) return message.reply(new MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`:x: You did not specify if you want \`truth\` or \`dare\` questions.`)
            );

            const query = args[0].toLowerCase();

            if (query === 'truth') {
                await f(`https://summonjs.xyz/api/random-truth`)
                    .then(r => r.json())
                    .then(t => message.channel.send(new MessageEmbed()
                        .setTitle('Truth')
                        .setColor(embedcolor)
                        .setDescription(t.truth)
                        .setFooter(`Requested by ${message.author.tag}`)
                    ))
            } else if (query === 'dare') {
                await f(`https://summonjs.xyz/api/random-dare`)
                    .then(r => r.json())
                    .then(d => message.channel.send(new MessageEmbed()
                        .setTitle('Dare')
                        .setColor(embedcolor)
                        .setDescription(d.dare)
                        .setFooter(`Requested by ${message.author.tag}`)
                    ))
            } else return message.reply(new MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`:x: Oops looks like that isn\'t a valid option, Either choose \`truth\` or \`dare\`.`)
            );
  }
}