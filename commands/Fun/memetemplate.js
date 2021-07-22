const Discord = module.require("discord.js");

module.exports = {
    name: "memetemps",
    description: "Get all the available meme templates",
    category: "fun",
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Meme Templates That Were Available Right Now")
        .setDescription("For Example: `sz!creatememe facepalm Hi BYE`\n`sohappy`,`tenguy`,`afraid`,`apcr`,`older`,`aag`,`atis`,`alyt`,`biw`,`stew`,`blb`,`bihw`,`kermit`,`bd`,`ch`,`cbg`,`wonka`,`cb`,`gandalf`,`keanu`,`cryingfloor`,`dsm`,`disastergirl`,`live`,`ants`,`doge`,`trump`,`drake`,`ermg`,`facepalm`,`feelsgood`,`firsttry`,`fwp`,`fa`,`fbf`,`fmr`,`fry`,`ggg`,`grumpycat`,`harold`,`hipster`,`icanhas`,`crazypills`,`elf`,`ackbar`,`agnes`,`aint-got-time`,`ams`,`away`,`awesome`,`captain`,`yuno`,`yodawg`,`whatyear`,`winter`,`tried`,`toohigh`,`success`,`spongebob`,`spiderman`,`sparta`,`snek`,`ski`,`soa`,`sadfrog`,`sad-obama`,`rollsafe`,`remembers`,`regret`,`red`,`mmm`,`money`,`patrick`,`nice`,`morpheus`,`joker`,`jetpack`,`imsorry`")
        .setTimestamp()
        .setColor("RANDOM");
    return message.channel.send(embed)
    message.react("✅");

    }
}