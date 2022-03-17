import { statsPhoto } from "../../utils/canvasUtils.js";
import { getMojangData, getSkyCryptProfile } from "../../utils/apiUtils.js";
import axios from "axios";

export default {
    name: "stats",
    description: "Check someone's skyblock stats",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const skycrypt = await getSkyCryptProfile(player).catch(e => console.log(e));
        const networth = await axios.post("https://maro.skybrokers.xyz/api/networth/categories", { data: skycrypt.raw }).catch(e => console.log(e));
        const total = networth.data.data.networth ? networth.data.data.networth.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }) : "$0";
        const skillAvg = skycrypt?.data?.average_level_no_progress || 0;
        const cataLvl = skycrypt?.data?.dungeons?.catacombs?.level?.level || 0;
        const senitherWeight = skycrypt?.data?.weight?.senither?.overall || 0;
        const lilyWeight = skycrypt?.data?.weight?.lily?.total || 0;
        const zombie = skycrypt?.data?.slayers?.zombie?.level?.currentLevel || 0;
        const spider = skycrypt?.data?.slayers?.spider?.level?.currentLevel || 0;
        const wolf = skycrypt?.data?.slayers?.wolf?.level?.currentLevel || 0;
        const enderman = skycrypt?.data?.slayers?.enderman?.level?.currentLevel || 0;
        const totalSlayer = skycrypt?.data?.slayer_xp?.toLocaleString('en-US') || 0;
        const totalSkill = Math.round(skycrypt?.data?.total_skill_xp).toLocaleString('en-US') || 0;
        const hotmLvl = skycrypt?.data?.mining?.core?.tier?.level || 0;

        const info = [{ title: "Skill average:", description: skillAvg }, { title: "Catacombs level:", description: cataLvl }, { title: "Senither/Lily Weight:", description: `${ Math.round(senitherWeight) }/${ Math.round(lilyWeight) }` }, { title: "Slayers:", description: `${ zombie }/${ spider }/${ wolf }/${ enderman }` }, { title: "Slayer exp:", description: totalSlayer }, { title: "Skills exp:", description: totalSkill }, { title: "HOTM:", description: hotmLvl }, { title: "Networth:", description: total }];
        statsPhoto(player, info, mojang.id, client);
    }
};