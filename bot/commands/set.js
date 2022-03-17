import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    name: "set",
    description: "Set reps / Warns amount for a certain user",
    admin: true,
    excute: async function (bot, args, text, author) {
        if (!args[2]) return;
        if (!bot.config.mongodb) return;
        if (args[0].toLowerCase() === author.toLowerCase()) return;

        const mojang = await getMojangData(args[1]);

        async function setAmount (type, amount) {
            let res;
            if (type === "warns")
                res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $set: { warns: amount } });
            else if (type === "reps")
                res = await schema.findOneAndUpdate({ uuid: mojang.id }, { $set: { reps: amount } });
            else return;

            if (!res) {
                await schema.create({
                    uuid: mojang.id,
                    banned: "no",
                    reps: 0,
                    warns: 0
                });

                sendGuildMessage(mojang.name, type);
            } else {
                sendGuildMessage(mojang.name, type);
            }
        }

        if (args[0] === "warns") {
            setAmount("warns", args[2]);
        } else if (args[0] === "reps") {
            setAmount("reps", args[2]);
        }

        function sendGuildMessage (username, type) {
            const messages = [`You just set ${ type } for ${ username } to ${ args[2] }`, `Done! setting ${ type } for ${ username } to ${ args[2] }`, `imagine manually setting ${ type } for ${ username } to ${ args[2] } lol`, `${ type } for ${ username } been set to ${ args[2] }`, `changed ${ type } for ${ username } to ${ args[2] }`];
            const message = messages[Math.floor(Math.random() * messages.length)];
            bot.say(`/gc ${ message }`);
        }
    }
};