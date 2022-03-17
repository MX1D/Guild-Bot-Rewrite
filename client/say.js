export default {
    excute: async function (client, text, bot, message) {
        if (bot.config.staff.includes(message.author.id)) {
            if (text.startsWith("say")) {
                const msg = text.trim().slice(4);
                bot.chat(msg);
            }
        }
    }
};