import axios from "axios";
import { getSkyCryptProfile, getMojangData } from "../../utils/apiUtils.js";
import { statsPhoto } from "../../utils/canvasUtils.js";

export default {
    name: "nw",
    description: "check someone's networth",
    admin: false,
    excute: async function (bot, args, text, author, client) {
        const player = args[0] || author;
        const profile = await getSkyCryptProfile(player).catch(e => console.log(e));
        const mojang = await getMojangData(player).catch(e => console.log(e));
        const networth = await axios.post("https://maro.skybrokers.xyz/api/networth/categories", { data: profile.raw }).catch(e => console.log(e));
        const storage = networth.data.data.categories.storage.total ? toLocaleStringFunction(networth.data.data.categories.storage.total) : "$0";
        const inventory = networth.data.data.categories.inventory.total ? toLocaleStringFunction(networth.data.data.categories.inventory.total) : "$0";
        const enderchest = networth.data.data.categories.enderchest.total ? toLocaleStringFunction(networth.data.data.categories.enderchest.total) : "$0";
        const armor = networth.data.data.categories.armor.total ? toLocaleStringFunction(networth.data.data.categories.armor.total) : "$0";
        const wardrobe = networth.data.data.categories.wardrobe_inventory.total ? toLocaleStringFunction(networth.data.data.categories.wardrobe_inventory.total) : "$0";
        const pets = networth.data.data.categories.pets.total ? toLocaleStringFunction(networth.data.data.categories.pets.total) : "$0";
        const talismans = networth.data.data.categories.talismans.total ? toLocaleStringFunction(networth.data.data.categories.talismans.total) : "$0";
        const total = networth.data.data.networth ? toLocaleStringFunction(networth.data.data.networth) : "$0";
        const info = [{ title: "Storage:", description: storage }, { title: "Inventory:", description: inventory }, { title: "Enderchest", description: enderchest }, { title: "Armor", description: armor }, { title: "Wardrobe:", description: wardrobe }, { title: "Pets:", description: pets }, { title: "Talismans:", description: talismans }, { title: "Networth:", description: total }];

        await statsPhoto(mojang.name, info, mojang.id, client);

        function toLocaleStringFunction (string) {
            if (string)
                return string.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
        }
    }
};