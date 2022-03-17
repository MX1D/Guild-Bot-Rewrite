import { getMojangData, getSkyCryptProfile } from "../../utils/apiUtils.js";
import { statsPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "slayers",
    description: "Check someone's slayers",
    admin: true,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const skycrypt = await getSkyCryptProfile(player).catch(e => console.log(e));

        const totalxp = skycrypt.data?.slayer_xp;
        const zombie = skycrypt.data?.slayers?.zombie?.level || { currentLevel: 0, xp: 0 };
        const spider = skycrypt.data?.slayers?.spider?.level || { currentLevel: 0, xp: 0 };
        const wolf = skycrypt.data?.slayers?.wolf?.level || { currentLevel: 0, xp: 0 };
        const enderman = skycrypt.data?.slayers?.enderman?.level || { currentLevel: 0, xp: 0 };
        const slayers = `${ zombie.currentLevel }/${ spider.currentLevel }/${ wolf.currentLevel }/${ enderman.currentLevel }`;
        const zombieLine = `${ zombie.currentLevel }, XP: ${ zombie.xp.toLocaleString() }`;
        const spiderLine = `${ spider.currentLevel }, XP: ${ spider.xp.toLocaleString() }`;
        const wolfLine = `${ wolf.currentLevel }, XP: ${ wolf.xp.toLocaleString() }`;
        const endermanLine = `${ enderman.currentLevel }, XP: ${ enderman.xp.toLocaleString() }`;
        const zombieSpiderSpent = `$${ skycrypt.data.slayer_coins_spent?.zombie?.toLocaleString() }\n$${ skycrypt.data.slayer_coins_spent?.spider?.toLocaleString() }`;
        const wolfEndermanSpent = `$${ skycrypt.data.slayer_coins_spent?.wolf?.toLocaleString() }/$${ skycrypt.data.slayer_coins_spent?.enderman?.toLocaleString() }`;
        const info = [
            { title: "Total Exp:", description: totalxp },
            { title: "Slayers:", description: slayers },
            { title: "Zombie:", description: zombieLine },
            { title: "Spider:", description: spiderLine },
            { title: "Wolf", description: wolfLine },
            { title: "Enderman", description: endermanLine },
            { title: "Zombie/Spider $$:", description: zombieSpiderSpent },
            { title: "Wolf/Enderman $$:", description: wolfEndermanSpent }
        ];

        statsPhoto(player, info, mojang.id, client);
    }
};