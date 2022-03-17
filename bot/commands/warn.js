import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "warn",
    description: "Warn someone annoying in your guild",
    admin: true,
    excute: async function (bot, args, text, author) {
        if (!args[0]) return;
        if (!bot.config.mongodb) return;
        if (args[0].toLowerCase() === author.toLowerCase()) return;

        const mojang = await getMojangData(args[0]).catch(e => console.log(e));

        let res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $inc: { warns: "1" } });
        if (!res) {
            await schema.create({
                uuid: mojang.id,
                banned: "no",
                reps: 1,
                warns: 0
            });

            sendGuildMessage(mojang.name, 0);
        } else {
            sendGuildMessage(mojang.name, res.warns);
        }

        function sendGuildMessage (username, warns) {
            const messages = [`${ username } got the warn and they now have ${ warns + 1 } warns!`, `${ username } just got a warn pog, ${ warns + 1 } total warns`, `You just gave a warn to ${ username } and they now have ${ warns + 1 } total warns!`, `how good could u be ${ username } to get a warn and have ${ warns + 1 } total warns ;-;`, `kekw ${ username } got warn and now at ${ warns + 1 } total warns`];
            const message = messages[Math.floor(Math.random() * messages.length)];

            bot.say(`/gc ${ message }`);
        }
    }
};