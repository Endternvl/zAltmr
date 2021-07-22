const Discord = require("discord.js");
const fetch = require('node-fetch');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success')
module.exports = {
  name: 'ds',
  aliases: ['doublestruck'],

run: async(client, message, args) => {
  let text = args.join("+")
  if(!text) return sendError('Please provide a text!', message.channel)
let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
let json = await res.json();
sendDone(json.text, message.channel)
 }
}
