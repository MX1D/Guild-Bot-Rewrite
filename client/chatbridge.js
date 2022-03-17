export default {
    excute: async function (client, text, bot, message) {
        if (message.author.id === client.user.id && message.channel.id === bot.config.textChannel) {
            Array.from(message.attachments).forEach((image, i) => {
                setTimeout(() => {
                    image.forEach((element, index) => {
                        if (element.url)
                            setTimeout(() => {
                                bot.say(`/gc ${ element.url }`).catch(e => console.log(e));
                            }, 500 * (index + 1));
                    });
                }, i * 1000);
            });
        }
        if (message.author.bot) return; // Checking if the author is a bot
        if (message.channel.id !== bot.config.textChannel) return;
        const cleared = message.content.replace(/ /g, "");
        if (cleared !== "")
            bot.say(`/gc ${ message.member.nick ? message.member.nick : message.author.username }: ${ message.content.split("\n")[0] }`).catch(e => console.log(e));

        // Sending attachments in game so players can see the photos someone sends

        const attachments = message.attachments;
        if (Array.from(attachments).length > 0) {
            Array.from(attachments).forEach((image, i) => {
                setTimeout(() => {
                    image.forEach((element, index) => {
                        if (element.url)
                            setTimeout(() => {
                                bot.say(`/gc ${ message.member.nick ? message.member.nick : message.author.username }: ${ element.url }`).catch(e => console.log(e));
                            }, 500 * (index + 1));
                    });
                }, i * 1000);
            });
        }
    }
};