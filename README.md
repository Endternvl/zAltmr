# Might be outdated as it's using discord.JS version 12

# Hello! 🤖
Hello, I'am zAltmr. A Multi-Configurated Discord bot with over 200+ commands.

## Features
What is the features of **zAltmr?**
- Multi-Purposed
- A lot of commands
- Quick setup
- Free To Fork

[![](https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm)](https://github.com/discordjs)

## Creators
The creator / coder of zAltmr

| Creator  | About |
| ------------- | ------------- |
| Endternvl (Skaryet) | Full Coder, Creator |
| AlvinGrizz / Zarc  | Coder  |
| bdrxzzzz | Coder |
| Recon's Server | Errors Helper |
| 𝙁𝘾 么 Glitch Editz | Helper and Just Cool? |
| Sintya4 | Glitch's GF LOL Also Cool Helping Me (Kinda) |
| Supporter | Supporter As Sure! 😀 |

<h3 align='center'>Code Support</h3>
</br></br>
<div align="center"> <a href="https://discord.gg/9R7hZtbnyw"><img src="https://invidget.switchblade.xyz/9R7hZtbnyw"/></a>
<br><br>
<br><br>

</div>

## How To Setup
How to setup the code of **zAltmr?**

- Upgrade **NODEJS** V14
- Choose one of this setup: (VisualStudioCode Setup) or (Website Setup)

## Upgrade NODEJS
Upgrading Node.js To A Better Version.

### Desktop Setup
Just go to the official [Node.js](https://nodejs.org) then download and execute the program u downloaded. It will take care of everything and with a few clicks of 'Next' you'll get the latest Node.js version running on your machine.

## Replit Setup
Alright so hey, repl.it is not supporting nodejs v16+ so i had to add this setup! this is going to be helpful!

1. Execute this command on shell (**SHELL NOT CONSOLE OKAY**)
```bash
npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
```
And then run this to clean npm cache and reinstall the package
```bash
rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
```
2. Create the .replit to execute node from the shell instead of the console.
`run="npm start"`

3. Make sure to add the start script in your package.json file
```json
  "scripts": {
    "start": "node ."
  }
  ```

You can also add all of it, in your package.json 
```bash
"scripts": {
  "start": "node .",
  "node-update": "npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH",
  "node-clean": "rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i",
  "node-update-then-clean": "npm run node-update && npm run node-clean-cache"
}
```

`npm run node-update-then-clean` to update-and-clean

4. (Optional) If you had packages like canvas or sqlite before, you need to re-install those packages
`npm uninstall canvas && npm i canvas`

*Note From Skaryet*
If it still logs 'Node.js v14', use node.js language, then do the setup up there, then dont mind about the v12 version log. its now on v16 dont worry
also this only works on nodejs language not in bash so, if you're wondering why its not working on bash (never tried i guess not working lol) bc its workis perfectly on node language.
also if it still logs like 'nodejs v12' or under, and u have done the setup perfectly the same, dont worry! it's now v16! so you will not get this `cannot find module 'discord.js'` error.

**DiscordJS v13 required node v16 or newer**

### VisualStudioCode Setup
How to setup on visual studio code?

1. Clone the github project: `git clone https://github.com/Endternvl/zAltmr`
2. `cd zAltmr`
3. Install the packages that required, But first, `npm install`
4. Then setup the `./config.json`
5. Then let's go coding!

### Website Setup
How to setup the code on a website like [Glitch](https://glitch.com) or [Replit](https://replit.com)

- There are 2 ways.
1. Button Setup
2. Manual Setup

# Button Setup
[![Run on Repl.it](https://repl.it/badge/github/Endternvl/zAltmr)](https://repl.it/github/Endternvl/zAltmr)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/Endternvl/zAltmr)

# Manual Setup

1. Clone the repository
2. Then, install the packages required, But first, do `npm i`
3. Then setup the `./config.json`
4. Then Let's Go Coding!

## Got any errors?
Join our [Discord Server](https://discord.gg/9R7hZtbnyw) and go to [this channel](https://discord.com/channels/810705096081145904/869095263061544980)

> © Copyright zAltmr
