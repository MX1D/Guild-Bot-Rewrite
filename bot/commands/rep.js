import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "rep",
    description: "Give a rep point to someone",
    admin: false,
    excute: async function (bot, args, text, author) {
        if (!args[0]) return;
        if (!bot.config.mongodb) return;
        if (args[0].toLowerCase() === author.toLowerCase()) return;

        const mojang = await getMojangData(args[0]).catch(e => console.log(e));

        let res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $inc: { reps: "1" } });
        if (!res) {
            await schema.create({
                uuid: mojang.id,
                banned: "no",
                reps: 1,
                warns: 0
            });

            sendGuildMessage(mojang.name, 0);
        } else {
            sendGuildMessage(mojang.name, res.reps);
        }

        function sendGuildMessage (username, reps) {
            const messages = [`${ username } got the rep and they now have ${ reps + 1 } reps!`, `${ username } just got a rep pog, ${ reps + 1 } total reps`, `You just gave a rep to ${ username } and they now have ${ reps + 1 } total reps!`, `how good could u be ${ username } to get a rep and have ${ reps + 1 } total reps ;-;`, `kekw ${ username } got rep and now at ${ reps + 1 } total reps`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};