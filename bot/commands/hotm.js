import { getSlothpixelData, getMojangData } from "../../utils/apiUtils.js";
import { hotmPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "hotm",
    description: "Check someone's heart of the mountain",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const slothpixel = await getSlothpixelData(player).catch(e => console.log(e));
        const data = slothpixel.members[mojang.id];
        const hotm = data?.mining_core?.nodes;

        const peak = () => {
            if (hotm.goblin_killer || hotm.star_powder) return true;
            else return false;
        };
        // Note: tiers are reversed cuz im too lazy to actually make a function that reverses them in canvasUtils.js ;-;
        const hotmObject = {
            t1: [null, hotm.mining_speed_2, null, hotm.powder_buff, null, hotm.mining_fortune_2, null],
            t2: [hotm.vein_seeker, hotm.lonesome_miner, hotm.professional, hotm.mole, hotm.fortunate, hotm.great_explorer, hotm.maniac_miner],
            t3: [null, hotm.goblin_killer, null, peak(), null, hotm.star_powder, null],
            t4: [hotm.sky_mall, hotm.mining_madness, hotm.mining_experience, hotm.efficient_miner, hotm.orbiter, hotm.front_loaded, hotm.precision_mining],
            t5: [null, hotm.random_event, null, hotm.daily_powder, null, hotm.crystallized, null],
            t6: [null, hotm.mining_speed_boost, hotm.titanium_insanium, hotm.mining_fortune, hotm.quick_forge, hotm.pickobulus, null],
            t7: [null, null, null, hotm.mining_speed, null, null, null]
        };

        const powder = {
            mithril: data.mining_core.powder_mithril + data.mining_core.powder_spent_mithril,
            gemstone: data.mining_core.powder_gemstone + data.mining_core.powder_spent_gemstone ? data.mining_core.powder_spent_gemstone : 0
        };

        hotmPhoto(mojang.name, hotmObject, mojang.id, powder, client);
    }
};