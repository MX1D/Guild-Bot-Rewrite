export default {
    excute: async function (bot, text) {
        if (text.startsWith("You cannot say the same message twice!"))
            setTimeout(() => { bot.say(`${ bot.lastMessage } ///////////`); }, 2000);
        // Qulaity anti spam ik ik
    }
};