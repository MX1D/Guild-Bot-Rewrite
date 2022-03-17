export default {
    excute: async function (bot, text, client, author) {
        if (!bot.config.frag) return;
        const msg = text.substring(text.indexOf(":") + 1);

        if (msg.startsWith(" frag"))
            bot.say(`/p ${ author }`);

        if (text.includes("joined the party.")) {
            const regex = /(?:\[.+?] )?(\w+)/;
            const username = text.match(regex)[1];
            setTimeout(() => { bot.say(`/p transfer ${ username }`); }, 500);
            setTimeout(() => { bot.say("/p leave"); }, 5500);
        }
    }
};