const { Client, Message, MessageEmbed } = require('discord.js');
let answers = [
  '@yousuck.noob',
  '@hesnoob.haha',
  '@thisguy.suck',
  '@paypal.removed',
  '@noob.haha',
  '@hacked.xyz',
  '@susmate.com',
  '@gmail.sus',
  '@why-im.withyou',
  '@someone-end.me',
  '@isnoob.io',
  '@username-is.noob',
  '@hahaget.lost',
  '@yahoo.sus',
  '@botmail.zip',
  '@gmail.com',
  '@yahoo.com'];
let passwords = [
  'Disb****',
  'disc******',
  'pass**********',
  'get****',
  'mails***',
  'endm****',
  'gamer***********',
  'asegeio*********',
  'whys*******',
  'Brot******',
  'imwith*******',
  'luckyyougotthispasswordlolnocencor',
  'starb*******',
  'egghunt2***',
  'secr*****'
];

module.exports = {
    name: 'hack',
    category: 'fun',
    description: 'Remember, This is just a **JOKE** not a real hacks!',
    usage: 'hack <usr>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const answer = answers[Math.floor(Math.random() * answers.length)];

      const passwrd = passwords[Math.floor(Math.random() * passwords.length)];
        function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }
         const taggedUser = message.mentions.users.first();

        if (!taggedUser) {
            return message.channel.send('Please mention somebody to hack!');
        }
        message.channel.send(`Hacking  ${taggedUser}...`);
        message.channel.send('Status: ■□□□□□□□□□□ 0%')
        .then(msg => {
            wait(100);
            msg.edit('Status: ■■□□□□□□□□□ 7%: Hacking Email...');
            wait(600);
            msg.edit(`Status: ■■■□□□□□□□□ 8%:\n \`Email: ${taggedUser}@yousuck.noob\`\n \`Password: ${passwrd}\` `);
            wait(600)
            msg.edit('Status: ■■□□□□□□□□□ 9%: Getting inside email...');
            wait(2000);
            msg.edit('Status: ■■■□□□□□□□□ 12%: Turning off antivirus');
            wait(1000);
            msg.edit('Status: ■■■■□□□□□□ 14%: Downloading SYNAPSE X');
            wait(100);
            msg.edit('Status: ■■■□□□□□□□□ 17%: Removing Captcha...');
            wait(100);
            msg.edit('Status: ■■□□□□□□□□□ 20%: Removing Paypal Account...');
            wait(10);
            msg.edit('Status: ■■■□□□□□□□□ 21%');
            wait(12);
            msg.edit('Status: ■■■■□□□□□□□ 22%');
            wait(100);
            msg.edit('Status: ■■■■■□□□□□□ 24%: Done removing paypal account');
            wait(1000);
            msg.edit('Status: ■■■■□□□□□□ 29%: Hacking Almost Done...');
            wait(80);
            msg.edit('Status: ■■■□□□□□□□□ 31%');
            wait(80);
            msg.edit('Status: ■■■■□□□□□□□ 36%');
            wait(40);
            msg.edit('Status: ■■■■■□□□□□□ 41%');
            wait(60);
            msg.edit('Status: ■■■■□□□□□□□ 47%');
            wait(50);
            msg.edit('Status: ■■■■■■□□□□□ 53%');
            wait(3000);
            msg.edit(`Status: ■■■■■■■□□□□ 58%: Email Password Changed So ${taggedUser} Cannot Get Into It`);
            wait(500);
            msg.edit('Status: ■■■■■■□□□□□ 66%');
            wait(60);
            msg.edit('Status: ■■■■■□□□□□□ 74%');
            wait(20);
            msg.edit('Status: ■■■■■□□□□□□ 79%');
            wait(83);
            msg.edit('Status: ■■■■■■□□□□ 80%');
            wait(50);
            msg.edit('Status: ■■■■■■■□□□ 85%');
            wait(14);
            msg.edit('Status: ■■■■■■■■■□□ 93%');
            wait(70);
            msg.edit('Status: ■■■■■■■■■■□ 97%');
            wait(90);
            msg.edit('Status: ■■■■■■■■■■■ 100%').then(() => {
              const embed = new MessageEmbed()
              .setTitle("Hacking Complete")
              .setDescription(`${taggedUser} has been hacked!`)
              .addField("INFORMATION", "Information of the user that you hack")
              .addField("EMAIL", `${taggedUser}${answer}`)
              .addField("PASSWORD", `${passwrd}`)
              .setFooter("Remember, This Is Just A Joke!")
              .setColor("RANDOM")
                message.channel.send(embed)
                console.log(`${message.author.username} hacked ${taggedUser} in ${message.guild.name}`)
            })
        })
    }
    }