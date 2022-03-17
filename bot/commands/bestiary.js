import { getSkyCryptProfile } from "../../utils/apiUtils.js";
import { bestiaryPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "bestiary",
    description: "Helps you grind your bestiary :D",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        // Note: this is written when i just started, i have a feeling this is gonna take a long time to make
        const player = args[0] || author;
        const skycrypt = await getSkyCryptProfile(player);

        let allMobs = ["cave_spider", "enderman", "skeleton", "slime", "spider", "witch", "zombie", "unburried_zombie", "kills_headless_horseman", "old_wolf", "wolf", "zombie_villager", "arachne", "arachne_brood", "arachne_keeper", "brood_mother_spider", "brood_mother_cave_spider", "dasher_spider", "respawning_skeleton", "random_slime", "spider_jockey", "voracious_spider", "weaver_spider", "blaze", "ghast", "magma_cube", "magma_cube_boss", "pigman", "wither_skeleton", "unstable_dragon", "young_dragon", "wise_dragon", "protector_dragon", "old_dragon", "strong_dragon", "superior_dragon", "endermite", "obsidian_wither", "voidling_extremist", "voidling_fanatic", "watcher", "zealot", "automaton", "butterfly", "emerald_slime", "goblin", "ice_walker", "lapis_zombie", "diamond_zombie", "diamond_skeleton", "redstone_pigman", "scatha", "sludge", "invisible_creeper", "thyst", "treasure_hoarder", "worm", "yog", "howling_spirit", "pack_spirit", "soul_of_the_alpha", "phantom_spirit", "scary_jerry", "trick_or_treater", "wraith", "crypt_dreadlord", "crypt_lurker", "king_midas", "scared_skeleton", "shadow_assassin", "skeleton_grunt", "skeleton_master", "skeleton_soldier", "skeletor_prime", "sniper_skeleton", "super_archer", "super_tank_zombie", "tank_zombie", "dungeon_respawning_skeleton", "crypt_witherskeleton", "zombie_commander", "zombie_grunt", "zombie_knight", "zombie_soldier"];

        let arr = [];
        allMobs.forEach(mob => {
            if (mob.includes("dragon")) return;
            const kills = skycrypt?.raw?.stats[`kills_${ mob }`];
            if (kills < 10) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 0, needed: 10 - kills });
            } else if (kills < 15) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 1, needed: 15 - kills });
            } else if (kills < 75) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 2, needed: 75 - kills });
            } else if (kills < 150) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 3, needed: 150 - kills });
            } else if (kills < 250) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 4, needed: 250 - kills });
            } else if (kills < 500) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 5, needed: 500 - kills });
            } else if (kills < 1500) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 6, needed: 1500 - kills });
            } else if (kills < 2500) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 7, needed: 2500 - kills });
            } else if (kills < 5000) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 8, needed: 5000 - kills });
            } else if (kills < 15000) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 9, needed: 15000 - kills });
            } else if (kills < 25000) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 10, needed: 25000 - kills });
            } else if (kills < 50000) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: 11, needed: 50000 - kills });
            } else if (kills < 100000) {
                arr.push({ name: (mob.charAt(0).toUpperCase() + mob.slice(1)).replace(/_/g, " "), id: mob, level: "12+", needed: 100000 - kills });
            }
        });

        arr.sort((a, b) => {
            return a.needed - b.needed;
        });

        bestiaryPhoto(player, arr, client);
    }
};