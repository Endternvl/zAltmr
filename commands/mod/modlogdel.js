const sendError = require('../../mores/error');
const d = require('quick.db');
const sendDone = require('../../mores/error');

module.exports = {
  name: 'delmodlog',
  description: 'Deletes A Mod-Log Data',
  usage: 'delmodlog',
  permissions: ["MANAGE_GUILD"],
  bot: ['MANAGE_GUILD'],

  run: async (client, message, args) => {
    const channel = await d.fetch(`modlog_${message.guild.id}`);

    if(channel === null){
    return sendError('There are no modlog set on this guild!', message.channel);
    } else {
      d.delete(`modlog_${message.guild.id}`);
      sendDone('Deleted Mod Log Channel Data From My Storage', message.channel)
    }
  }
}