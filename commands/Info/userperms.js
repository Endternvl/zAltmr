const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "userperms",
  aliases: ["usrprms"],
  category: "info",
  description: "user's permission in the server",

  run: async(client, message, [member = '']) => {
    if(!member.match(/\d{17,19}/)) {
        member = message.author.id;
    };
    member = await message.guild.members.fetch(member.match(/\d{17,19}/)[0]).catch(() => null);
    if(!member) {
        return message.channel.send(`\\❌ User not found.`);
    };
    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();
    return message.channel.send(new MessageEmbed().setColor(member.displayColor || 'RANDOM').setTitle(`${member.displayName}'s Permissions`).setFooter(`Permissions | \©️${new Date().getFullYear()} SyzeBot`).setDescription(['\\📊 - This Server', '\\#️⃣ - The Current Channel', '\`\`\`properties', '📊 | #️⃣ | Permission', '========================================', `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`, '\`\`\`'].join('\n')));
   }
}