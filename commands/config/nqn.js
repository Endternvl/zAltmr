module.exports = {
  name: "nqn",
  aliases: ['notquitenitro'],
  usage: "<on/off>",
  description: "NQN, Enable to use animated emote for free.",
  category: "settings",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    if (args[0] == "on") {
      await client.data.set(`nqn_${message.guild.id}`, "on");
      return client.send("NQN has been activated/turned on", message);
    }

    if (args[0] == "off") {
      await client.data.delete(`nqn_${message.guild.id}`);
      return client.send("NQN has been turned off", message);
    }
  }
};