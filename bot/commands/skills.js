import { getMojangData, getSkyCryptProfile } from "../../utils/apiUtils.js";
import { statsPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "skills",
    description: "Show someone's skills",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const skycrypt = await getSkyCryptProfile(player).catch(e => console.log(e));
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const data = skycrypt.data;

        const farming = data.levels?.farming?.level || 0;
        const mining = data.levels?.mining?.level || 0;
        const combat = data.levels?.combat?.level || 0;
        const foraging = data.levels?.foraging?.level || 0;
        const fishing = data.levels?.fishing?.level || 0;
        const enchanting = data.levels?.enchanting?.level || 0;
        const alchemy = data.levels?.alchemy?.level || 0;
        const avg = data.average_level_no_progress || 0;

        const info = [{ title: "Farming:", description: farming }, { title: "Mining:", description: mining }, { title: "Combat:", description: combat }, { title: "Foraging:", description: foraging }, { title: "Fishing:", description: fishing }, { title: "Enchanting:", description: enchanting }, { title: "Alchemy:", description: alchemy }, { title: "Skill average:", description: avg }];

        statsPhoto(player, info, mojang.id, client);
    }
};