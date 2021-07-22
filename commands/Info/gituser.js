const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")
const { sendError } = require('../../mores/error');

module.exports = {
    name: "gituser",
    aliases: ["git", "github"],
    category: "search",
    usage: "Github [GITHUB_USERNAME]",
    exmaple: "Github Emoji",
    description: `Github User Account Information!`,
    run: async (client, message, args) => {

       try {

  if (!args[0]) return message.reply("You Didn't Provide A Github Username!")
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.reply(`This User | ${args[0]} | Is Not In Github! Please Enter A Valid Username!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} Information!`, avatar_url)
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "No Bio"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "No Location"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`Tysm For Using Me! ${message.author.username}`)

            message.channel.send(embed)

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return sendError(`Something Went Wrong Try Again Later!`, message.channel)
        }
    }
};