import { getMojangData } from "../../utils/apiUtils.js";
import schema from "../../models/schema.js";

export default {
    excute: async function (bot, text) {
        if (!text.endsWith("joined the guild!") || text.startsWith("Guild >")) return;

        const regex = /(?:\[.+?] )?(\w+)/;
        const username = text.match(regex)[1];

        const mojang = await getMojangData(username).catch(e => console.log(e));

        let profileData;
        try {
            profileData = await schema.findOne({ uuid: mojang.id });
            if (!profileData) {
                await schema.create({
                    uuid: mojang.id,
                    banned: "no",
                    reps: 0,
                    warns: 0
                });
            }
        } catch (e) {
            console.log(e);
        }

        const data = await schema.findOne({ uuid: mojang.id });
        if (data.banned === "yes") {
            bot.say(`/g kick ${ username } banned`);
        }

    }
};