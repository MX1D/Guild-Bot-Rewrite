import { getMojangData } from "../../utils/apiUtils.js";
import axios from "axios";

export default {
    excute: async function (bot, text) {
        if (!bot.config.frag || !bot.config.apikey) return;
        if (!text.includes("has invited you to join their party!")) return;

        const regex = /(?:\[.+?] )?(\w+)/;
        const username = text.match(regex)[1];
        const mojang = await getMojangData(username).catch(e => console.log(e));
        const hypixel = await axios.get(`https://api.hypixel.net/findGuild?key=${ bot.config.apikey }&byUuid=${ encodeURIComponent(mojang.id) }`).catch(e => console.log(e));

        if (hypixel.data.guild !== bot.config.guildID) return;

        bot.say(`/p accept ${ username }`);
        setTimeout(() => { bot.say(`/p leave`); }, 5000);
    }
};