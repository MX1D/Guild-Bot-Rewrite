import { evaluate } from "mathjs";

export default {
    name: "calc",
    description: "Minecraft calculator :D",
    admin: false,
    excute: async function (bot, args) {
        // calculator using mathjs library
        const math = args.join(" ").replace(/x/g, "*");
        const calc = evaluate(math);
        const messages = [`Question: ${ math }, Answer: ${ calc }`, `You asked ${ math }, Result: ${ calc }`, `Your answer ${ calc }`, `Result for your question: ${ calc }`];
        const message = messages[Math.floor(Math.random() * messages.length)];
        bot.say(`/gc ${ message }`);
    }
};