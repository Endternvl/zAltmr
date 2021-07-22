const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   category: "moderation",
   description: "Locks a Channel",

   run: async(client, message, args) => {

     let channel = message.channel;
     let reason = args.join("  ");

   if (!message.member.hasPermission('MANAGE_CHANNELS') || !message.guild.owner) {
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
    ]).then(() => {
      channel.setName(channel.name += `🔒`)
    });
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} has been Locked!`)
   .setFooter(reason || "locked for no reason")
   .setColor(`#34568B`);
   await message.channel.send(embed);
   message.delete();
   }
}