import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "unban",
    description: "Unban some random non you unbanned from the guild",
    admin: true,
    excute: async function (bot, args, text, author) {
        if (!args[0]) return;
        if (!bot.config.mongodb) return;
        if (args[0].toLowerCase() === author.toLowerCase()) return;

        const mojang = await getMojangData(args[0]).catch(e => console.log(e));

        let res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $set: { banned: "no" } });
        if (!res) {
            await schema.create({
                uuid: mojang.id,
                banned: "no",
                reps: 0,
                warns: 0
            });

            sendGuildMessage(mojang.name);
        } else {
            sendGuildMessage(mojang.name);
        }

        setTimeout(() => {
            bot.say(`/g invite ${ args[0] }`);
        }, 1100)
            
        function sendGuildMessage (username) {
            const messages = [`${ username } Has been unbanned from the guild.`, `unbanned ${ username } of the guild!`, `The user ${ username } been unbanned.`, `${ username } must be annoying to get unbanned ngl`, `KEKW i just unbanned ${ username } imagine`, `woohooo unbanned ${ username }`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};
