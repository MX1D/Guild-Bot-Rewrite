import { getMojangData, getSkyCryptProfile } from "../../utils/apiUtils.js";
import { statsPhoto } from "../../utils/canvasUtils.js";
import schema from "../../models/schema.js";
import axios from "axios";

export default {
    excute: async function (bot, text, client) {
        if (!bot.config.gJoinStats) return;
        if (!text.endsWith("joined the guild!")) return;

        const regex = /(?:\[.+?] )?(\w+)/;
        const username = text.match(regex)[1];
        const mojang = await getMojangData(username).catch(e => console.log(e));

        if (bot.config.mongodb) {
            const data = await schema.findOne({ uuid: mojang.id });
            if (data) {
                if (data.banned === "yes") return;
            }
        }

        const skycrypt = await getSkyCryptProfile(username).catch(e => console.log(e));
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
        statsPhoto(username, info, mojang.id, client);
    }
};