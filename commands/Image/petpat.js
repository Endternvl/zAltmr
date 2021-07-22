module.exports = {
    name: "petpat",
    aliases: ["pat"],
    category: "Image",
    usage: "Petpat | <User>",
    description: "Petpat User",
    run: async (client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        try {
            return message.channel.send(new (require("discord.js")).MessageAttachment(encodeURI(`https://api.monkedev.com/canvas/petpet?imgUrl=${Member.user.displayAvatarURL({ format: "png" })}`), "Petpat.gif"));
        } catch (_) {
            console.log(_);
            return message.channel.send("Unable To Generate Petpat... Maybe Something Went Wrong!");
        }
    }
};