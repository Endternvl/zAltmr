const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const Guild = require("../../models/log"); //require our log model
const mongoose = require("mongoose");
const sendd = require('../../mores/success');
const sendr = require('../../mores/error')

module.exports = {
  name: 'disablethings',
  description: 'disable configurations',
  usage: '<welcome/leave/level/modlogs/server-logs/starboard>',
  cooldown: 5000,
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_WEBHOOKS"
  ],
  permissions: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    let keys = [
      "welcome",
      "leave",
      "level",
      "moderation-logs",
      "starboard"
    ];
    const key = await client.awaitReply(
      message,
      `Please choose one of the settings that you want to disable!\n**${keys.join(
        " | "
      )}**\nType \`cancel\` to stop setup`,
      180000,
      true
    );
    if (!key) return sendr('You didn\'t provide a settings on 3 minutes. Setup canceled.', message.channel);
    if (key.content.toLocaleLowerCase() === 'cancel') return sendd('Setup canceled', message.channel)
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send(client.emotes.error + " | Error: Invalid key provided, Please try again.", message);
    }
    if (key.content.toLocaleLowerCase() === 'welcome') {
      let fetching = client.data.fetch(`welchannel_${message.guild.id}`)
      if (fetching === null) return sendr('There are no welcome channel on this guild! i cant find it on my data! maybe channel removed, or not setup yet.', message.channel)
      if (fetching) {
        client.data.delete(`welchannel_${message.guild.id}`)
        sendd('Deleted welcome channel from my data! if it was a mistake, please resetup it! welcome message is not deleted because not included.', message.channel)
      }
    }
    if (key.content.toLocaleLowerCase() === 'leave') {
        let fetching = client.data.fetch(`levchannel_${message.guild.id}`)
        if (fetching === null) return sendr('There are no leave channel on this guild! i cant find it on my data! maybe channel removed, or not setup yet', message.channel)
        if (fetching) {
          client.data.delete(`levchannel_${message.guild.id}`)
          sendd('Deleted leave channel from my data! if it was a mistake, please resetup it! leave message is not deleted because not included', message.channel)
        }
      }
      if (key.content.toLocaleLowerCase() === 'level') {
        let fetching = client.data.fetch(`levelch_${message.guild.id}`)
        if (fetching === null) return sendr('There are no level channel on this guild! i cant find it on my data! maybe channel removed, or not setup yet', message.channel)
        if (fetching) {
          client.data.delete(`levelch_${message.guild.id}`)
          sendd('Deleted level channel from my data! if it was a mistake, please resetup it! level message is not deleted because not included', message.channel)
        }
      }
      if (key.content.toLocaleLowerCase() === 'moderation-logs') {
        let fetching = client.data.fetch(`modlog_${message.guild.id}`)
        if (fetching === null) return sendr('There are no modlog channel on this guild! i cant find it on my data! maybe channel removed, or not setup yet', message.channel)
        if (fetching) {
          client.data.delete(`modlog_${message.guild.id}`)
          sendd('Deleted modlog channel from my data! if it was a mistake, please resetup it!', message.channel)
        }
      }
      if (key.content.toLocaleLowerCase() === 'starboard') {
        let fetching = client.data.fetch(`starboard_${message.guild.id}`)
        if (fetching === null) return sendr('There are no starboard channel on this guild! i cant find it on my data! maybe channel removed, or not setup yet', message.channel)
        if (fetching) {
          client.data.delete(`starboard_${message.guild.id}`)
          sendd('Deleted starboard channel from my data! if it was a mistake, please resetup it!', message.channel)
        }
      }
  }
}