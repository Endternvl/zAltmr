const Discord = module.require("discord.js");

module.exports = {
    name: "creatememe",
    category: "fun",
    description: "Create Custom Memes",
    usage: "[MEME]",
    run: async(client, message, args) => {
        message.delete();
        const memetemplate = args[0];
        if (!memetemplate) {
            return message.reply("You didn't specify the template! To see the available meme templates, type `sz!memetemplates`");
        }
        const memetext1 = args[1];
        if (!memetext1) {
            return message.reply("Please enter text for top!");
        }
        const memetext2 = args[2];
        if (!memetext2) {
            return message.reply("Please enter a text for the down!");
        }
        message.channel.send({ files: [{ attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`, name: "ctmemme.png"}]})
    }, catch (error) {
        const errorlogs = client.channels.cache.get("828907079703199754") //Put ur channel id To see error log
        message.channel.send("Seems like an error has occured!. Please try again in a few hours!")
        errorlogs.send("Error on Creatememe command! \n\nError:\n\n"+error);
    }
}