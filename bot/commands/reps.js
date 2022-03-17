import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "reps",
    description: "Check someone's amount of reps",
    admin: false,
    excute: async function (bot, args, text, author) {
        if (!bot.config.mongodb) return;
        const player = args[0] || author;
        const mojang = await getMojangData(player);
        let data = await schema.findOne({ uuid: mojang.id });
        if (!data) {
            await schema.create({
                uuid: mojang.id,
                banned: "no",
                reps: 0,
                warns: 0
            });

            sendGuildMessage(mojang.name, 0);
        }

        sendGuildMessage(mojang.name, data.reps);

        function sendGuildMessage (username, reps) {
            const messages = [`${ username } Has ${ reps } reps!`, `${ username } Got ${ reps } reps!`, `${ username } got reps ${ reps } times`, `imagine having ${ reps } reps L ${ username }`, `omg ${ username } got ${ reps } reps!!!`, `look ${ username } got ${ reps } reps kekw`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};