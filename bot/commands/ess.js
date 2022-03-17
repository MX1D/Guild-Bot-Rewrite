import { getSlothpixelData, getMojangData } from "../../utils/apiUtils.js";
import { statsPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "ess",
    description: "check someone's dungeon essence",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const profile = await getSlothpixelData(player).catch(e => console.log(e));
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const data = profile.members[mojang.id];
        const info = [{ title: "💀 Wither:", description: data?.essence_wither || 0 }, { title: "🧟 Undead:", description: data?.essence_undead || 0 }, { title: "🐉 Dragon:", description: data?.essence_dragon || 0 }, { title: "🧊 Ice:", description: data?.essence_ice || 0 }, { title: "💎 Diamond:", description: data?.essence_diamond || 0 }, { title: "🥇 Gold:", description: data?.essence_gold || 0 }, { title: "🕸️ Spider:", description: data?.essence_spider }];

        statsPhoto(mojang.name, info, mojang.id, client);
    }
};