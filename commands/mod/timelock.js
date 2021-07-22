const Discord = module.require("discord.js");
const ms = require("ms"); //Make sure to install ms package

module.exports = {
    name: "timelock",
    usage: "timelock <time>",
    category: "moderation",
    description: "Start a timed lockdown in a channel",
    run: async(client, message, args) => {
        const time = args.join(" ");
        if (!time) {
        return message.channel.send("Enter a valid time period in `Seconds`, `Minutes` or `Hours`")
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough powers! missing perms: `MANAGE_CHANNELS`")
   }
   if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
     return message.channel.send("I Don't Have Enough Powers To Lock! Missing Perms: `MANAGE_CHANNELS`")
   }
        message.channel.overwritePermissions([
            {
               id: message.guild.id,
               deny : ['SEND_MESSAGES'],
            },
           ],);
           const embed = new Discord.MessageEmbed()
           .setTitle("Channel Updates")
           .setDescription(`${message.channel} has been placed under lockdown for \`${time}\``)
           .setFooter("Please be patient!")
           .setColor("RANDOM");
           message.channel.send(embed)

           let time1 = (`${time}`)
           setTimeout(function(){
           message.channel.overwritePermissions([
               {
               id: message.guild.id,
               null: ['SEND_MESSAGES'],
               },
            ],);
           const embed2 = new Discord.MessageEmbed()
           .setTitle("Channel Updates")
           .setDescription(`Locked has been lifted in ${message.channel}`)
           .setColor("RANDOM");
           message.channel.send(embed2);
        }, ms(time1));
        message.delete();
    }
}