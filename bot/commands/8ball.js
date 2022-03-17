export default {
    name: "8ball",
    description: "Knows the future :O",
    admin: false,
    excute: async function (bot, args) {
        if (!args[0]) return;
        // it's just random messages lol
        const messages = [`It is certain.`, `It is decidedly so.`, `Without a doubt.`, `Yes definitely.`, `You may rely on it.`, `As I see it, yes.`, `Most likely.`, `Outlook good.`, `Yes.`, `Signs point to yes.`, `Reply hazy, try again.`, `Ask again later.`, `Better not tell you now.`, `Cannot predict now.`, `Concentrate and ask again.`, `Don't count on it.`, `My reply is no.`, `My sources say no.`, `Outlook not so good.`, `Very doubtful.`];
        const message = messages[Math.floor(Math.random() * messages.length)];
        bot.say(`/gc ${ message }`);
    }
};