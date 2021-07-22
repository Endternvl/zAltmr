const ownerid = "787842689969684480";
const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Gets a discord invite link to a current id server.",
        usage: "[ID | name]",
      
    run: async(bot, message, args) => {
      if (message.author.id !== ownerid) {
        return message.reply('You cant use this command! This command is only for <@' + ownerid + ">")
      }
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) return message.channel.send("Enter Guild Name or Guild ID of where you want Invite Link.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("That's the Invalid Guild Name");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Sorry, I doesn't have CREATE_INSTANT_INVITE Permission There!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} has occured!`);
            });
            message.channel.send(new MessageEmbed()
            .setDescription(`Here is the link: [\`Click me\`](${invite})`)
            .setColor('RED'));
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - I'm not in that Server.`);
        }
    } else {
        return;
    }
    }

}