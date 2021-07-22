const discord = require('discord.js');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'betrayal',
  description: 'play a betrayal together!',
  cooldown: 10,

  run: async(client, message, args) => {
    const channel = message.member.voice.channel;
        if (!channel) return sendError("You Must Be In A Voice Channel!", message.channel);
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return sendError("I need `CREATE_INSTANT_INVITE` permission", message.channel);

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return sendError("Could not start **BETRAYAL.IO**!", message.channel);
                sendDone(`[Click here to start **BETRAYAL.IO** in ${channel.name}](https://discord.gg/${invite.code})`, message.channel);
            })
            .catch(e => {
                message.channel.send("❌ | Could not start **BETRAYAL.IO**!");
            })
  }
}