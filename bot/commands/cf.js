export default {
    name: "cf",
    description: "coin clip :D",
    admin: false,
    excute: async function (bot) {
        // Another random message sender lmfao
        const messages = [`Heads`, `Talis`, `It's Heads!`, `It's Tails`, `looks like Heads`, `looks like Tails`, `Heads!! :O`, `Tails!! :O`, `And Heads won!`, `And Tails won!`, `look it's Heads!`, `look it's Tails!`];
        const message = messages[Math.floor(Math.random() * messages.length)];
        bot.say(`/gc ${ message }`);
    }
};