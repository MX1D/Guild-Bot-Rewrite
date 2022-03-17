import { WebhookClient } from "discord.js";

export default {
    excute: async function (bot, text, client, author) {
        if (!bot.config.webhook) return;
        if (author === bot.username) return;
        if (!text.startsWith("Guild >")) return;
        if (!text.includes(":")) return;
        // if (author === bot.username && !text.startsWith("Guild >") && !text.includes(":")) return;

        // bot.once("message", message => {
        //     const text = message + ``;
        const regex = /(?:\[.+?] )?(\w+)/g;
        if (!text.match(regex)) return;
        const username = text.match(regex)[1].replace(/(?:\[.+?] )/g, "");
        const webhook = new WebhookClient({ url: bot.config.webhook });
        const msg = text.substring(text.indexOf(":") + 1).replace(/\*/g, "\\*").replace(/@everyone/g, "@/everyone").replace(/@here/g, "@/here");
        webhook.send({
            username: username,
            avatarURL: `https://minotar.net/helm/${ username }/512`,
            content: msg
        }).catch(e => console.log(e));
        // });  
    }
};