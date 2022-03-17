// Package imports

import { Client, Intents } from "discord.js";
import mineflayer from "mineflayer";
import fs from "fs";
import mongoose from "mongoose";
import { findBestMatch } from "string-similarity";

// Config setup

const config = JSON.parse(fs.readFileSync("json/config.json", "utf-8", err => { if (err) console.log(err); }));

// Discord client setup

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({ intents: [myIntents] });

// Mineflayer client setup

const bot = mineflayer.createBot({
    host: "hypixel.net",
    username: config.email,
    password: config.password,
    auth: config.auth,
    version: "1.12",
    colorsEnabled: false,
    hideErrors: true
});

// Making config easier to use

bot.config = config;

// Catching login errors with the bot

bot.on("kicked", console.log);
bot.on("error", console.log);

// Mongodb setup

if (config.mongodb) {
    mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Database connected!");
    }).catch(e => console.log(e));
}

// Discord client ready event
client.on("ready", () => {
    console.log(`Discord client ${ client.user.tag } is ready!`);
});

// Mineflayer bot ready event
bot.once("login", () => {
    console.log(`Mineflayer client ${ bot.username } logged in, version: ${ bot.version }`);

    // Custom function to have track of last message because of hypixel anti same message twice
    bot.lastMessage = "";
    bot.say = async (content) => {
        await bot.chat(content);
        bot.lastMessage = content;
    };
});

// Command handler setup

const commandFiles = fs.readdirSync("./bot/commands/").filter(files => files.endsWith(".js"));
const eventFiles = fs.readdirSync("./bot/events").filter(files => files.endsWith(".js"));

bot.on("message", async message => {
    const text = message + ``;

    const regex = /(?:\[.+?] )?(\w+)/g; // Regex for the guild message thx to @TakoTheMaid#5717 for this
    const regText = text?.match(regex);

    // Getting the author of the guild message
    let author;
    if (text.startsWith("Guild >"))
        author = regText[1].replace(/(\[).+?(\])\s/g, "");

    // Command & Event handling
    const content = text.substring(text.indexOf(":") + 2);

    if (content.startsWith(config.prefix)) {
        const commandSent = content.split(/ +/)[0].replace(config.prefix, "");
        const compared = findBestMatch(`${ commandSent }.js`, commandFiles); // Using a detection system for closest command
        let command = await import(`./bot/commands/${ compared.bestMatch.target }`);
        const args = content.split(/ +/);
        args.shift();
        if (command.default.admin && regText[2] === config.adminTag || regText[2] === "GM") {
            await command.default.excute(bot, args, text, author, client).catch(e => console.log(e)); // Excuting the admin command
        } else if (!command.default.admin) {
            await command.default.excute(bot, args, text, author, client).catch(e => console.log(e)); // Excuting the command 
        }
    }

    // Running the events
    eventFiles.forEach(async event => {
        const file = await import(`./bot/events/${ event }`);
        file.default.excute(bot, text, client, author);
    });

});

// Discord client message commands / events *whatever you call it ;-;*
client.on("messageCreate", message => {
    const text = message.content;
    const discordFiles = fs.readdirSync("./client").filter(files => files.endsWith(".js"));
    discordFiles.forEach(async file => {
        const event = await import(`./client/${ file }`);
        await event.default.excute(client, text, bot, message);
    });
});

// Logging the client in discord

client.login(config.token);