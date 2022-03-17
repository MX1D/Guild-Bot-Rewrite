import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "warns",
    description: "Check someone's amount of warns",
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

        sendGuildMessage(mojang.name, data.warns);

        function sendGuildMessage (username, warns) {
            const messages = [`${ username } Has ${ warns } warns!`, `${ username } Got ${ warns } warns!`, `${ username } got warns ${ warns } times`, `imagine having ${ warns } warns L ${ username }`, `omg ${ username } got ${ warns } warns!!!`, `look ${ username } got ${ warns } warns kekw`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};