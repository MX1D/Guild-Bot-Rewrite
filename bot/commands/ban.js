import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "ban",
    description: "Ban someone from the guild",
    admin: true,
    excute: async function (bot, args, text, author) {
        if (!args[0]) return;
        if (!bot.config.mongodb) return;
        if (args[0].toLowerCase() === author.toLowerCase()) return;

        const mojang = await getMojangData(args[0]).catch(e => console.log(e));

        let res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $set: { banned: "yes" } });
        if (!res) {
            await schema.create({
                uuid: mojang.id,
                banned: "yes",
                reps: 0,
                warns: 0
            });

            sendGuildMessage(mojang.name);
        } else {
            sendGuildMessage(mojang.name);
        }

	setTimeout(() => {
        bot.say(`/g kick ${ args[0] } banned${ args.join(" ") ? `:${ args.join(" ") }` : "" }`);
	}, 1100)

        function sendGuildMessage (username) {
            const messages = [`${ username } Has been banned from the guild.`, `Banned ${ username } of the guild!`, `The user ${ username } been banned.`, `${ username } must be annoying to get banned ngl`, `KEKW i just banned ${ username } imagine`, `woohooo banned ${ username }`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};