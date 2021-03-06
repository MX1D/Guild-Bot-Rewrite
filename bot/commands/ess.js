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
        const info = [{ title: "π Wither:", description: data?.essence_wither || 0 }, { title: "π§ Undead:", description: data?.essence_undead || 0 }, { title: "π Dragon:", description: data?.essence_dragon || 0 }, { title: "π§ Ice:", description: data?.essence_ice || 0 }, { title: "π Diamond:", description: data?.essence_diamond || 0 }, { title: "π₯ Gold:", description: data?.essence_gold || 0 }, { title: "πΈοΈ Spider:", description: data?.essence_spider }];

        statsPhoto(mojang.name, info, mojang.id, client);
    }
};