// Importing packages

import axios from "axios";
import canvasPackage from "canvas";
import fs from "fs";
import { MessageAttachment } from "discord.js";
const { createCanvas, loadImage, registerFont } = canvasPackage;
const canvas = createCanvas(640, 640);
const ctx = canvas.getContext('2d');
const config = JSON.parse(fs.readFileSync("./json/config.json", "utf-8", err => { if (err) console.log(err); }));

// The main function for making photos - this took like 10h cuz i was learning how to use canvas lmfao
export async function statsPhoto (username, info, uuid, client) {

    // 10 random backgrounds for the photos
    const backgrounds = ["https://cdn.discordapp.com/attachments/850843468938870824/952613542719291402/do-sharp.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800509804664/mushroom.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800161669230/barn.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799830347826/park.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799532556418/jungle.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799146647602/zealots.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798802739300/end_edge.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798253289502/svens.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606797905141850/water.png"];
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Getting player rank
    const player = await axios.get(`https://api.hypixel.net/player?key=${ config.apikey }&uuid=${ uuid }`);

    function getRank (player) {
        let rank = '';
        if (player.rank) { // Check if is ADMIN, MOD, HELPER, YT...
            rank = player.rank; // player.prefix exist here as well
        } else if (player.monthlyPackageRank && player.monthlyPackageRank !== 'NONE') { // Check if is MVP++
            rank = 'MVP++';
        } else if (player.newPackageRank) { // Check if is VIP...MVP+
            rank = player.newPackageRank.replace('_PLUS', '+');
        } else {
            rank = 'Non-Rank';
        }

        return rank;
    }

    // Registering the minecraft font
    registerFont('MinecraftRegular-Bmg3.ttf', { family: 'Minecraft' });

    // Putting the background image
    await loadImage(background).then(image => {
        ctx.drawImage(image, -256, 0, image.width, 640);
    }).catch(e => console.log(e));
    // Putting the skin image
    const skin = await loadImage(`https://visage.surgeplay.com/full/${ uuid }.png`);
    ctx.drawImage(skin, 0, 100, 237, 384);

    // Coloring the name depending on the rank
    if (getRank(player.data.player) === "Non-Rank")
        ctx.fillStyle = "#AAAAAA";
    else if (getRank(player.data.player) === "VIP" || getRank(player.data.player) === "VIP+")
        ctx.fillStyle = "#55FF55";
    else if (getRank(player.data.player) === "MVP" || getRank(player.data.player) === "MVP+")
        ctx.fillStyle = "#55FFFF";
    else if (getRank(player.data.player) === "MVP++")
        ctx.fillStyle = "#FFAA00";
    else if (getRank(player.data.player).toLowerCase() === "admin" || getRank(player.data.player).toLowerCase() === "youtuber")
        ctx.fillStyle = "#FF5555";
    else if (getRank(player.data.player).toLowerCase() === "mod")
        ctx.fillStyle = "#00AA00";
    else if (getRank(player.data.player).toLowerCase === "helper")
        ctx.fillStyle = "#5555FF";
    else if (getRank(player.data.player).toLowerCase === "gamemaster")
        ctx.fillStyle = "#00AA00";
    else
        ctx.fillStyle = "#FFFFFF";

    // Rendering the username
    ctx.font = '50px "Minecraft"';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "#000000";
    const text = ctx.measureText(username);
    ctx.fillText(username, 600 - text.width, 50);

    // Doing a loop for every element in the info array
    info.forEach((element, i) => {
        writeInfo(element, i);
    });

    // The function writes the info on the screen
    function writeInfo (element, i) {
        ctx.fillStyle = "#42f5a1";
        if ((element.description + "").includes("$")) {
            ctx.fillStyle = "#FFAA00";
        }
        if (i === 0) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 110);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 150);
        }
        if (i === 1) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 200);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 240);
        }
        if (i === 2) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 290);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 330);
        }
        if (i === 3) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 380);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 420);
        }
        if (i === 4) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 470);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 510);
        }
        if (i === 5) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 300, 560);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 300, 600);
        }
        if (i === 6) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 15, 560);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 15, 600);
        }
        if (i === 7) {
            ctx.font = '30px "Minecraft"';
            ctx.fillText(element.title, 15, 40);
            ctx.font = '40px "Minecraft"';
            ctx.fillText(element.description, 15, 80);
        }
    }

    // Sending the photo in the chat channel set in the config
    const channel = client.channels.cache.get(config.textChannel);
    const attachment = new MessageAttachment(canvas.toBuffer(), `${ username }.png`);
    channel.send({ files: [attachment] });

    // fs.writeFileSync("./output.png", canvas.toBuffer(), "binary", err => { if (err) console.log(err); });
}

// hotm photo function to make cool hotm photos uwu - btw this took 5h to make
export async function hotmPhoto (username, hotm, uuid, powder, client) {
    // 10 random backgrounds for the photos
    const backgrounds = ["https://cdn.discordapp.com/attachments/850843468938870824/952613542719291402/do-sharp.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800509804664/mushroom.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800161669230/barn.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799830347826/park.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799532556418/jungle.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799146647602/zealots.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798802739300/end_edge.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798253289502/svens.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606797905141850/water.png"];
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Registering the minecraft font
    registerFont('MinecraftRegular-Bmg3.ttf', { family: 'Minecraft' });

    // Getting player rank
    const player = await axios.get(`https://api.hypixel.net/player?key=${ config.apikey }&uuid=${ uuid }`);

    function getRank (player) {
        let rank = '';
        if (player.rank) { // Check if is ADMIN, MOD, HELPER, YT...
            rank = player.rank; // player.prefix exist here as well
        } else if (player.monthlyPackageRank && player.monthlyPackageRank !== 'NONE') { // Check if is MVP++
            rank = 'MVP++';
        } else if (player.newPackageRank) { // Check if is VIP...MVP+
            rank = player.newPackageRank.replace('_PLUS', '+');
        } else {
            rank = 'Non-Rank';
        }

        return rank;
    }

    // Coloring the name depending on the rank
    if (getRank(player.data.player) === "Non-Rank")
        ctx.fillStyle = "#AAAAAA";
    else if (getRank(player.data.player) === "VIP" || getRank(player.data.player) === "VIP+")
        ctx.fillStyle = "#55FF55";
    else if (getRank(player.data.player) === "MVP" || getRank(player.data.player) === "MVP+")
        ctx.fillStyle = "#55FFFF";
    else if (getRank(player.data.player) === "MVP++")
        ctx.fillStyle = "#FFAA00";
    else if (getRank(player.data.player).toLowerCase() === "admin" || getRank(player.data.player).toLowerCase() === "youtuber")
        ctx.fillStyle = "#FF5555";
    else if (getRank(player.data.player).toLowerCase() === "mod")
        ctx.fillStyle = "#00AA00";
    else if (getRank(player.data.player).toLowerCase === "helper")
        ctx.fillStyle = "#5555FF";
    else if (getRank(player.data.player).toLowerCase === "gamemaster")
        ctx.fillStyle = "#00AA00";
    else
        ctx.fillStyle = "#FFFFFF";

    // Putting the background image
    await loadImage(background).then(image => {
        ctx.drawImage(image, -256, 0, image.width, 640);
    }).catch(e => console.log(e));

    // Rendering the username
    ctx.font = '50px "Minecraft"';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "#000000";
    const text = ctx.measureText(username);
    ctx.fillText(username, 600 - text.width, 50);

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const greenGlass = await loadImage("https://cdn.discordapp.com/attachments/850843468938870824/952979712429416588/glass_lime.png");
    const grayGlass = await loadImage("https://cdn.discordapp.com/attachments/850843468938870824/952979712219697223/glass_gray.png");
    const purpleGlass = await loadImage("https://cdn.discordapp.com/attachments/850843468938870824/952982701030375514/glass_magenta.png");

    // doing a loop for each hotm level
    for (let tier in hotm) {
        hotm[tier].forEach(async (stat, i) => {
            await drawLevel(stat, i, (tier.slice(1) - ""));
        });
    }

    // Drawing the stack size on the hotm perks
    async function drawLevel (stat, i, tier) {

        if (i === 0) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 78.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 78.5, 0 + (tier * 69), 69, 69);
            } else {
                ctx.drawImage(grayGlass, 78.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 1) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 147.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 147.5, 0 + (tier * 69), 69, 69);
                ctx.font = '30px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillStyle = "#55FFFF";
                if (stat !== true && stat !== false)
                    ctx.fillText(stat, 147.5 + 35, (tier * 69) + 65);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 147.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 2) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 216.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 216.5, 0 + (tier * 69), 69, 69);
                ctx.font = '30px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillStyle = "#55FFFF";
                if (stat !== true && stat !== false)
                    ctx.fillText(stat, 216.5 + 35, (tier * 69) + 65);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 216.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 3) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 285.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 285.5, 0 + (tier * 69), 69, 69);
                ctx.font = '30px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillStyle = "#55FFFF";
                if (stat !== true && stat !== false)
                    ctx.fillText(stat, 285.5 + 35, (tier * 69) + 65);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 285.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 4) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 354.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 354.5, 0 + (tier * 69), 69, 69);
                ctx.font = '20px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillText(stat, 354.5 + 69, (tier * 69) + 50);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 354.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 5) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 423.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 423.5, 0 + (tier * 69), 69, 69);
                ctx.font = '30px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillStyle = "#55FFFF";
                if (stat !== true && stat !== false)
                    ctx.fillText(stat, 423.5 + 35, (tier * 69) + 65);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 423.5, 0 + (tier * 69), 69, 69);
            }
        }
        if (i === 6) {
            if (stat === null) {
                ctx.drawImage(purpleGlass, 492.5, 0 + (tier * 69), 69, 69);
            } else if (stat !== undefined) {
                ctx.drawImage(greenGlass, 492.5, 0 + (tier * 69), 69, 69);
                ctx.font = '30px "Minecraft"';
                ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
                ctx.fillStyle = "#55FFFF";
                if (stat !== true && stat !== false)
                    ctx.fillText(stat, 492.5 + 35, (tier * 69) + 65);
                ctx.shadowOffsetX, ctx.shadowOffsetY = 0;
            } else {
                ctx.drawImage(grayGlass, 492.5, 0 + (tier * 69), 69, 69);
            }
        }
    }

    // Drawing powder amount
    ctx.font = '40px "Minecraft"';
    ctx.shadowOffsetX, ctx.shadowOffsetY = 2;
    ctx.fillStyle = "#55FFFF";
    let mithrilPowder = `Powder: ${ powder.mithril.toLocaleString() }`;
    ctx.fillText(mithrilPowder, 10, 630);
    ctx.fillStyle = "#FF55FF";
    ctx.fillText(powder.gemstone.toLocaleString(), 20 + ctx.measureText(mithrilPowder).width, 630);

    // Sending the photo in the chat channel set in the config
    const channel = client.channels.cache.get(config.textChannel);
    const attachment = new MessageAttachment(canvas.toBuffer(), `${ username }.png`);
    channel.send({ files: [attachment] });
}

export async function bestiaryPhoto (username, bestiary, client) {
    // 10 random backgrounds for the photos
    const backgrounds = ["https://cdn.discordapp.com/attachments/850843468938870824/952613542719291402/do-sharp.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800509804664/mushroom.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606800161669230/barn.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799830347826/park.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799532556418/jungle.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606799146647602/zealots.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798802739300/end_edge.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606798253289502/svens.png", "https://cdn.discordapp.com/attachments/850843468938870824/952606797905141850/water.png"];
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    // Putting the background image
    await loadImage(background).then(image => {
        ctx.drawImage(image, -256, 0, image.width, 640);
    }).catch(e => console.log(e));

    // Registering the minecraft font
    registerFont('MinecraftRegular-Bmg3.ttf', { family: 'Minecraft' });

    ctx.fillStyle = "#000000";
    ctx.font = '20px "Minecraft"';
    // ctx.shadowColor = "#ffffff";
    ctx.shadowOffsetX, ctx.shadowOffsetY = 0;

    bestiary.forEach((mob, i) => {
        if (i === 0)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 20);
        if (i === 1)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 50);
        if (i === 2)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 80);
        if (i === 3)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 110);
        if (i === 4)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 140);
        if (i === 5)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 170);
        if (i === 6)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 200);
        if (i === 7)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 230);
        if (i === 8)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 260);
        if (i === 9)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 290);
        if (i === 10)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 320);
        if (i === 11)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 350);
        if (i === 12)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 380);
        if (i === 13)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 410);
        if (i === 14)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 440);
        if (i === 15)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 470);
        if (i === 16)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 500);
        if (i === 17)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 530);
        if (i === 18)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 560);
        if (i === 19)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 20, 590);
        if (i === 20)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 50);
        if (i === 21)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 80);
        if (i === 22)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 110);
        if (i === 23)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 140);
        if (i === 24)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 170);
        if (i === 25)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 20);
        if (i === 26)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 200);
        if (i === 27)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 230);
        if (i === 28)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 260);
        if (i === 29)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 290);
        if (i === 30)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 320);
        if (i === 31)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 350);
        if (i === 32)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 380);
        if (i === 33)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 410);
        if (i === 34)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 440);
        if (i === 35)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 470);
        if (i === 36)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 500);
        if (i === 37)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 530);
        if (i === 38)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 560);
        if (i === 39)
            ctx.fillText(`${ mob.name }/Need: ${ mob.needed }`, 320, 590);
    });


    // Sending the photo in the chat channel set in the config
    const channel = client.channels.cache.get(config.textChannel);
    const attachment = new MessageAttachment(canvas.toBuffer(), `${ username }.png`);
    channel.send({ files: [attachment] });

    // fs.writeFileSync("./output.png", canvas.toBuffer(), "binary", err => { if (err) console.log(err); });
}