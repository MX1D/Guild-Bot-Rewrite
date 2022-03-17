export default {
    excute: async function (client, text, bot, message) {
        // Checking if the message is sent in the updates channel
        if (!bot.config.updateschannel) return;
        if (message.channel.id !== bot.config.updateschannel) return;

        // Sending the update message for each line
        const msg = message.content.replace(/</g, "").replace(/>/g, "").replace(/_/g, "").replace(/\*/g, "");
        msg.split("\n").forEach((line, i) => {
            setTimeout(() => {
                bot.chat(`/gc [UPDATE] ${ line }`);
            }, 1000 * i);
        });

        // Sending the embed details
        if (message.embeds.length > 0) {
            setTimeout(() => {
                msg.embeds.forEach(embed => {
                    if (embed.description) {
                        embed.description.split("\n").forEach((line, i) => {
                            setTimeout(() => {
                                bot.chat(`[UPDATE] ${ line }`);
                            }, 1000 * i);
                        });
                    }
                });
            }, (msg.split("\n").length + 2) * 1000);
        }

        if (Array.from(message.attachments).length > 0) {
            Array.from(message.attachments).forEach((image, i) => {
                setTimeout(() => {
                    image.forEach((element, index) => {
                        if (element.url)
                            setTimeout(() => {
                                bot.say(element.url).catch(e => console.log(e));
                            }, 500 * (index + 1));
                    });
                }, i * 7000);
            });
        }
    }
};